// import { useState, useEffect } from 'react';

// export default function NotificationSystem() {
//   const [notifications, setNotifications] = useState([]);

//   // Example function to add a notification
//   const addNotification = (message, type = 'info') => {
//     const id = Date.now();
//     setNotifications(prev => [...prev, { id, message, type }]);

//     // Auto-remove after 3 seconds
//     setTimeout(() => {
//       setNotifications(prev => prev.filter(note => note.id !== id));
//     }, 3000);
//   };

//   // Demo notifications when component mounts
//   useEffect(() => {
//     setTimeout(() => addNotification('Operation successful!', 'success'), 500);
//     setTimeout(() => addNotification('Something went wrong!', 'error'), 2000);
//     setTimeout(() => addNotification('Info message example', 'info'), 3500);
//   }, []);

//   return (
//     <div style={{
//       position: 'fixed',
//       top: 0,
//       left: '50%',
//       transform: 'translateX(-50%)',
//       zIndex: 50,
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center'
//     }}>
//       {notifications.map(notification => (
//         <Notification key={notification.id} notification={notification} />
//       ))}

//       {/* Demo controls */}
//       <div style={{
//         position: 'fixed',
//         bottom: '16px',
//         left: '50%',
//         transform: 'translateX(-50%)',
//         display: 'flex',
//         gap: '8px'
//       }}>
//         <button
//           style={{
//             padding: '8px 16px',
//             backgroundColor: '#10B981',
//             color: 'white',
//             borderRadius: '4px',
//             border: 'none',
//             cursor: 'pointer'
//           }}
//           onClick={() => addNotification('Success notification!', 'success')}>
//           Show Success
//         </button>
//         <button
//           style={{
//             padding: '8px 16px',
//             backgroundColor: '#EF4444',
//             color: 'white',
//             borderRadius: '4px',
//             border: 'none',
//             cursor: 'pointer'
//           }}
//           onClick={() => addNotification('Error notification!', 'error')}>
//           Show Error
//         </button>
//         <button
//           style={{
//             padding: '8px 16px',
//             backgroundColor: '#3B82F6',
//             color: 'white',
//             borderRadius: '4px',
//             border: 'none',
//             cursor: 'pointer'
//           }}
//           onClick={() => addNotification('Info notification!', 'info')}>
//           Show Info
//         </button>
//       </div>
//     </div>
//   );
// }

// function Notification({ notification }) {
//   const [isVisible, setIsVisible] = useState(false);

//   // Colors based on notification type
//   const getBackgroundColor = (type) => {
//     switch(type) {
//       case 'success': return '#10B981'; // green color
//       case 'error': return '#EF4444';   // red color
//       case 'info': return '#3B82F6';    // blue color
//       default: return '#4B5563';        // gray color
//     }
//   };

//   useEffect(() => {
//     // Start enter animation
//     setTimeout(() => setIsVisible(true), 10);

//     // Start exit animation before the notification is removed
//     const exitTimer = setTimeout(() => setIsVisible(false), 2500);

//     return () => clearTimeout(exitTimer);
//   }, []);

//   return (
//     <div style={{
//       backgroundColor: getBackgroundColor(notification.type),
//       color: 'white',
//       padding: '12px 24px',
//       borderRadius: '4px',
//       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//       margin: '8px 0',
//       transition: 'all 500ms',
//       transform: isVisible ? 'translateY(0)' : 'translateY(-48px)',
//       opacity: isVisible ? 1 : 0
//     }}>
//       {notification.message}
//     </div>
//   );
// }

import {useState,useEffect, useRef} from 'react';
import './notification.css';
export const Notification = (parameter)=>{

  const [aniStyle,setAniStyle] = useState("incoming_ani")

  const successStyle={backgroundColor:"green"}
  const errorStyle={backgroundColor:"red"}
  const completionStyle={backgroundColor:"blue"}

  useEffect(()=>{
  let timeout = setTimeout(()=>{
    setAniStyle("outgoing_ani");
  },1800)
  return()=> {clearTimeout(timeout)};
  },[])
  let finalStyle;
  switch(parameter.code){
    case "success":
      finalStyle = successStyle;
      break;
    case "error":
      finalStyle = errorStyle;
      break;
    case "complete":
      finalStyle = completionStyle;
      break;
    default:
      finalStyle = completionStyle;
  }
  return(<>
  <div className={`notification_wrapper ${aniStyle}`}>
    <div className="notification_container" style={finalStyle}>{parameter.message}</div>
    </div>
  </>)
}