const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
      },
      DOB: {
        type: Date,
        required: true
      },
      age: {
        type: Number,
        required: true,
        validate: {
          validator: function(value) {
            return value > 0;
          },
          message: 'Age must be greater than 0'
        }
      },
      location: {
          type: String,
          required: true
        
      }
});

 
const User = mongoose.model('User', UserSchema);
module.exports = User;
