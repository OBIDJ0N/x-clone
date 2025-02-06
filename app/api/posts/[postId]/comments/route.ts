import Comment from "@/database/comment.model";
import Post from "@/database/post.model";
import User from "@/database/user.model";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { postId: string } }) {
  try {
    await connectToDatabase();
    const { postId } = route.params;
    const { currentUser }: any = await getServerSession(authOptions);
    
    const post = await Post.findById(postId)
      .populate({
        path: "comments",
        model: Comment,
        populate: {
          path: "user",
          model: User,
          select: "name email profileImage _id username",
        }, options : {
          sort: { likes: -1 }
        }
      })

    const filteredComments = post.comments.map((item: any) => ({
      body: item.body,
      createdAt: item.createdAt,
      user: { 
        name: item.user.name,
        email: item.user.email,
        profileImage: item.user.profileImage,
        _id: item.user._id,
        username: item.user.username,
      },
      likes: item.likes.length,
      hasLiked: item.likes.includes(currentUser._id),
      _id: item._id,
    }));

    return NextResponse.json(filteredComments);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
