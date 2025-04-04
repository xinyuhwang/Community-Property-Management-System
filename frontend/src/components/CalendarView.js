// frontend/src/components/CalendarView.js
import React, { useReducer, useEffect, useMemo } from "react";
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify'; // 新增安全处理库
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Paper,
  Typography,
  Snackbar
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { format, isBefore, parseISO } from "date-fns";

// =============================================================================
// 改进点 1: 使用reducer集中管理状态 (解决状态分散问题)
// =============================================================================
const initialState = {
  selectedDate: new Date(),
  openDialog: false,
  selectedEvent: null,
  editMode: false,
  notification: null
};

function calendarReducer(state, action) {
  switch (action.type) {
    case 'SET_DATE':
      return { ...state, selectedDate: action.payload };
    case 'OPEN_DIALOG':
      return { ...state, openDialog: true, ...action.payload };
    case 'CLOSE_DIALOG':
      return { ...state, openDialog: false, selectedEvent: null, editMode: false };
    case 'TOGGLE_EDIT':
      return { ...state, editMode: !state.editMode };
    case 'SHOW_NOTIFICATION':
      return { ...state, notification: action.payload };
    case 'CLEAR_NOTIFICATION':
      return { ...state, notification: null };
    default:
      return state;
  }
}

// =============================================================================
// 改进点 2: 日期缓存优化 (解决重复计算问题)
// =============================================================================
const useDateCache = (events) => {
  return useMemo(() => {
    const cache = new Map();
    events.forEach(event => {
      const dateKey = format(parseISO(event.date), 'yyyy-MM-dd');
      if (!cache.has(dateKey)) cache.set(dateKey, []);
      cache.get(dateKey).push(event);
    });
    return cache;
  }, [events]);
};

// =============================================================================
// 主组件
// =============================================================================
export default function CalendarView({ events, onEventUpdate }) {
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  const dateCache = useDateCache(events);

  // 当前选中日期的活动
  const dayEvents = useMemo(() => {
    const dateKey = format(state.selectedDate, 'yyyy-MM-dd');
    return dateCache.get(dateKey) || [];
  }, [state.selectedDate, dateCache]);

  // ===========================================================================
  // 改进点 3: 表单验证 (增强数据完整性)
  // ===========================================================================
  const validateEvent = (event) => {
    if (!event.title?.trim()) throw new Error('Event title is required');
    if (isBefore(parseISO(event.endTime), parseISO(event.startTime))) {
      throw new Error('End time must be after start time');
    }
  };

  // ===========================================================================
  // 事件处理函数
  // ===========================================================================
  const handleUpdate = async () => {
    try {
      validateEvent(state.selectedEvent);
      await onEventUpdate(state.selectedEvent);
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: { message: 'Event updated successfully', severity: 'success' }
      });
      dispatch({ type: 'CLOSE_DIALOG' });
    } catch (error) {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: { message: error.message, severity: 'error' }
      });
    }
  };

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to cancel this event?')) return;
    onEventUpdate({ ...state.selectedEvent, status: "cancelled" });
    dispatch({ type: 'CLOSE_DIALOG' });
  };

  // ===========================================================================
  // 渲染部分
  // ===========================================================================
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        {/* 改进点 4: 禁用过去日期选择 */}
        <DateCalendar
          value={state.selectedDate}
          onChange={(date) => dispatch({ type: 'SET_DATE', payload: date })}
          disablePast
          slots={{
            day: (props) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  backgroundColor: dateCache.has(format(props.day, 'yyyy-MM-dd'))
                    ? "rgba(63, 81, 181, 0.1)"
                    : "inherit",
                  borderRadius: "50%",
                }}
              />
            )
          }}
        />

        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Events on {format(state.selectedDate, 'MMMM do, yyyy')}
          </Typography>
          {dayEvents.length === 0 ? (
            <Typography>No events scheduled</Typography>
          ) : (
            dayEvents.map((event) => (
              <EventListItem
                key={event.id}
                event={event}
                onClick={() => dispatch({
                  type: 'OPEN_DIALOG',
                  payload: { selectedEvent: event }
                })}
              />
            ))
          )}
        </div>

        {/* 改进点 5: 抽离对话框组件 */}
        <EventDialog
          open={state.openDialog}
          event={state.selectedEvent}
          editMode={state.editMode}
          onClose={() => dispatch({ type: 'CLOSE_DIALOG' })}
          onEdit={() => dispatch({ type: 'TOGGLE_EDIT' })}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onCancel={() => dispatch({ type: 'TOGGLE_EDIT' })}
        />

        {/* 改进点 6: 全局通知系统 */}
        <Snackbar
          open={!!state.notification}
          autoHideDuration={3000}
          onClose={() => dispatch({ type: 'CLEAR_NOTIFICATION' })}
        >
          <Alert severity={state.notification?.severity}>
            {state.notification?.message}
          </Alert>
        </Snackbar>
      </div>
    </LocalizationProvider>
  );
}

// =============================================================================
// 改进点 7: 抽离子组件 (提高可维护性)
// =============================================================================
const EventListItem = React.memo(({ event, onClick }) => (
  <Paper sx={{ p: 2, mb: 2, cursor: 'pointer' }} onClick={onClick}>
    <Typography variant="subtitle1">{event.title}</Typography>
    <Typography variant="body2" sx={{ mt: 1 }}>
      {/* 改进点 8: XSS防护 */}
      {DOMPurify.sanitize(event.description)}
    </Typography>
    {event.status === "cancelled" && (
      <Alert severity="warning" sx={{ mt: 1 }}>
        This event has been cancelled
      </Alert>
    )}
  </Paper>
));

const EventDialog = ({
  open,
  event,
  editMode,
  onClose,
  onEdit,
  onUpdate,
  onDelete,
  onCancel
}) => {
  const [localEvent, setLocalEvent] = React.useState(event);

  React.useEffect(() => {
    setLocalEvent(event);
  }, [event]);

  const handleFieldChange = (field, value) => {
    setLocalEvent(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {editMode ? 'Edit Event' : event?.title}
        {event?.status === 'cancelled' && (
          <Alert severity="warning" sx={{ mt: 1 }}>
            Cancelled
          </Alert>
        )}
      </DialogTitle>
      <DialogContent>
        {editMode ? (
          <>
            <TextField
              label="Title"
              fullWidth
              margin="dense"
              value={localEvent?.title || ''}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              required
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              margin="dense"
              value={localEvent?.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
            />
            <TextField
              label="Start Time"
              type="time"
              fullWidth
              margin="dense"
              InputProps={{ step: 300 }} // 5分钟间隔
              value={localEvent?.startTime || ''}
              onChange={(e) => handleFieldChange('startTime', e.target.value)}
            />
            <TextField
              label="End Time"
              type="time"
              fullWidth
              margin="dense"
              InputProps={{ step: 300 }}
              value={localEvent?.endTime || ''}
              onChange={(e) => handleFieldChange('endTime', e.target.value)}
            />
          </>
        ) : (
          <>
            <Typography paragraph>
              {DOMPurify.sanitize(event?.description)}
            </Typography>
            <Typography variant="body2">
              <strong>Time:</strong> {format(parseISO(event?.startTime), 'h:mm a')} -{' '}
              {format(parseISO(event?.endTime), 'h:mm a')}
            </Typography>
            <Typography variant="body2">
              <strong>Location:</strong> {event?.location || 'Not specified'}
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        {!editMode && (
          <>
            <Button onClick={onEdit}>Edit</Button>
            <Button onClick={onDelete} color="error">
              Cancel Event
            </Button>
          </>
        )}
        {editMode && (
          <>
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={onUpdate} color="primary">
              Save
            </Button>
          </>
        )}
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

// =============================================================================
// 改进点 9: PropTypes验证
// =============================================================================
CalendarView.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['active', 'cancelled'])
    })
  ).isRequired,
  onEventUpdate: PropTypes.func.isRequired
};

EventListItem.propTypes = {
  event: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

EventDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  event: PropTypes.object,
  editMode: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
