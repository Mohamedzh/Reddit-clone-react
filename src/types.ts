export interface Post {
    id: number
    title: string
    body: string
    commentsTotal: number
    createdAt: Date
    updatedAt: Date
    userId: number
    upVotesTotal: number
    downVotesTotal: number
    tags: Tag[]
    votes: Vote[]
    comments: Comment[]
}

export interface Comment {
    id: number
    userId: number
    post: number
    createdAt: Date
    body: string
}


export interface Tag {
    id: number
    title: string
}

export interface Vote {
    id: number
    value: number
    userId: number
    postId: number
    createdAt: Date
}

export interface Theme {
    background: string,
    textColor: string,
    bg: string,
    variant: string,
    themeBtn: string,
    logo: string,
}

export interface NewPost {
    id:number
    title: string
    body: string
    userId: number
}

export interface VoteObject{
    userId: number
    value: number
}

export interface CommentObject{
    body: string
    userId: number
}