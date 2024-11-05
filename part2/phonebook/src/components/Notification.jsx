const Notification = ({ message, type }) => {
    if (!message) return null;

    const notificationStyle = {
        color: type === 'error' ? 'red' : 'green',
        background: type === 'error' ? '#F8D7DA' : '#DFF2BF',
        border: `1px solid ${type === 'error' ? 'red' : 'green'}`,
        padding: '10px',
        marginBottom: '10px',
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification;