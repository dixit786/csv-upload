const Message = require('./../models/Message');
const schedule = require('node-schedule');


module.exports.scheduleMessage = async (req, res) => {
    const { message, day, time } = req.body;

    try {
        // Parse day and time into a Date object
        const [hours, minutes] = time.split(':').map(Number);
        const scheduledDate = new Date(day);
        scheduledDate.setHours(hours, minutes, 0, 0);

        const newMessage = new Message({
            message: message,
            scheduledAt: scheduledDate
        });

        await newMessage.save();

        // Schedule the job
        schedule.scheduleJob(scheduledDate, async function() {
            // Insert the message into DB when the time comes
            console.log(`Inserting message: "${message}" into the database at ${scheduledDate}`);
            await newMessage.save();
        });

        res.json({ message: 'Message scheduled successfully', data: newMessage });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}