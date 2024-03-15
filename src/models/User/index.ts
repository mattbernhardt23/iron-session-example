import mongoose, { Schema } from "mongoose";

// At some point, we would like to add in something for professional credentials to be displayed.
// In order to do that, we need to figure out what to do with university affiliations, places of employment, job titles, educational background, etc.
// We will get back to this. 
export interface Users extends mongoose.Document {
    email: String;
    password: String;
    admin: Boolean;
    contributor: Boolean;
    moderator: Boolean;
    name: String;
    bio: String;
    birthdate: Date;
    city: String;
    state: String;
    country: String;
}


const UserSchema = new mongoose.Schema<Users>({
    email:{ type: String, required: true, unique: true},
    password:{ type: String, required: true},
    admin:{ type: Boolean, required: true, default: false},
    contributor:{ type: Boolean, required: true, default: false},
    moderator:{ type: Boolean, required: true, default: false},
    name:{ type: String, required: false},
    bio:{ type: String, required: false},
    birthdate:{ type: Date, required: false},
    city:{ type: String, required: false},
    state:{ type: String, required: false},
    country:{ type: String, required: false, default: "United States"},
});

export default mongoose.models.User || mongoose.model<Users>("User", UserSchema);