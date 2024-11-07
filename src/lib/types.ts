import { ReactNode } from "react";

export interface Feed {
    topics: TopicList;
}
 
export interface TopicList { 
    topics: TopicType[];
    children: (topic: TopicType) => ReactNode;
 }

export interface Creator {
    _id: string;
    name: {
        title: string;
        first: string;
        last: string;
      };
    img: {
        large: string;
        medium: string;
        thumbnail: string;
      };
}
 
export interface TopicType {
    _id: string;
    creator: Creator;
    title: string;
    description: string;
    args: Argument[];
    up_votes: number; 
    down_votes: number; 
 }

export interface ArgumentList { 
    args: Argument[];
    children: (arg: Argument) => ReactNode;
 }

export interface Argument {
    _id:string;
    title: string;
    description: string;
    supporting: boolean;
    up_votes: number;
    down_votes: number;
    creator: Creator;
    args?: Argument[];
}

export interface AddArgument extends Argument {
    topic_id: string;
}