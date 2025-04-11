"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface PostData {
  _id: string;
  postId: string;
  userId: string;
  content: string;
  __v: number;
}

interface PopularPostResponse {
  message: string;
  data: {
    post: PostData;
    commentCount: number;
  } | null;
}

interface TopUser {
  userId: string;
  name: string;
  totalCommentCount: number;
}

interface TopUsersResponse {
  message: string;
  data: TopUser[];
}

export default function Home() {
  const [popularPost, setPopularPost] = useState<PopularPostResponse["data"]>(null);
  const [topUsers, setTopUsers] = useState<TopUsersResponse["data"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularPost = async () => {
      try {
        const response = await fetch("http://localhost:4000/posts");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PopularPostResponse = await response.json();
        setPopularPost(data.data);
      } catch (err: any) {
        setError("Error fetching popular post.");
        console.error("Error fetching popular post:", err);
      }
    };

    const fetchTopUsers = async () => {
      try {
        const response = await fetch("http://localhost:4000/users");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: TopUsersResponse = await response.json();
        setTopUsers(data.data);
      } catch (err: any) {
        setError("Error fetching top users.");
        console.error("Error fetching top users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularPost();
    fetchTopUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 font-bold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Community Highlights
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Discover what's trending in our community.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {popularPost && popularPost.post && (
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Most Popular Post
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong className="font-semibold">Post ID:</strong>{" "}
                {popularPost.post.postId}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong className="font-semibold">User ID:</strong>{" "}
                {popularPost.post.userId}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong className="font-semibold">Content:</strong>{" "}
                {popularPost.post.content}
              </p>
              <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                Comment Count: {popularPost.commentCount}
              </p>
            </div>
          )}

          {topUsers && topUsers.length > 0 && (
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Top 5 Users by Comment Count
              </h2>
              <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300">
                {topUsers.map((user) => (
                  <li key={user.userId} className="mb-2">
                    <strong className="font-semibold">User:</strong> {user.name}{" "}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({user.userId})
                    </span>{" "}
                    - <span className="font-semibold text-green-600 dark:text-green-400">
                      Comments: {user.totalCommentCount}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </main>

        <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
          <hr className="mb-4 border-gray-300 dark:border-gray-700" />
          <div className="flex gap-4 flex-wrap items-center justify-center">
            <a
              className="flex items-center gap-2 hover:underline"
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              Learn
            </a>
            <a
              className="flex items-center gap-2 hover:underline"
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
              />
              Examples
            </a>
            <a
              className="flex items-center gap-2 hover:underline"
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to nextjs.org →
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}