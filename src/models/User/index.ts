import mongoose, { Schema } from "mongoose";
import { Topics } from "@models/Topic";
import { Argument } from "@models/Argument";

// At some point, we would like to add in something for professional credentials to be displayed.
// In order to do that, we need to figure out what to do with university affiliations, places of employment, job titles, educational background, etc.
// We will get back to this.
export interface Users extends mongoose.Document {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: string;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    hashedPassword: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: Date;
    age: number;
  };
  registered: {
    date: Date;
    age: number;
  };
  phone: string;
  cell: string;
  gov_id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
  admin: boolean;
  contributor: boolean;
  moderator: boolean;
  bio?: string;
  topicVotes: Topics[];
  argumentVotes: Argument[];
}

const UserSchema = new mongoose.Schema<Users>({
  gender: { type: String, required: true },
  name: {
    title: { type: String, required: true },
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  location: {
    street: {
      number: { type: String, required: true },
      name: { type: String, required: true },
    },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postcode: { type: String, required: true },
    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    timezone: {
      offset: { type: String, required: true },
      description: { type: String, required: true },
    },
  },
  email: { type: String, required: true },
  login: {
    uuid: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    hashedPassword: { type: String, required: false },
    salt: { type: String, required: true },
    md5: { type: String, required: true },
    sha1: { type: String, required: true },
    sha256: { type: String, required: true },
  },
  dob: {
    date: { type: Date, required: true },
    age: { type: Number, required: true },
  },
  registered: {
    date: { type: Date, required: true },
    age: { type: Number, required: true },
  },
  phone: { type: String, required: true },
  cell: { type: String, required: true },
  gov_id: {
    name: { type: String, required: true },
    value: { type: String, required: true },
  },
  picture: {
    large: { type: String, required: true },
    medium: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  nat: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
  contributor: { type: Boolean, required: true, default: false },
  moderator: { type: Boolean, required: true, default: false },
  bio: { type: String, required: false },
  topicVotes: [{ type: Schema.Types.ObjectId, ref: "Topics", required: false }],
  argumentVotes: [{ type: Schema.Types.ObjectId, ref: "Arguments", required: false }],

});

export default mongoose.models.User ||
  mongoose.model<Users>("User", UserSchema);
