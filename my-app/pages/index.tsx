import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { globalConstant } from 'constant/constant';
import Outline from '@/components/Outline';
import axios from 'axios';

const BLOG_API_URL = `${globalConstant.serverURL}/api/v1/post/get-all`;
const DEFAULT_IMAGE = 'https://i.ibb.co/vVnqvfJ/sss.jpg';

interface Blog {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  category: string;
  attachment?: string;
}

const BlogCard = ({ blog }: { blog: Blog }) => {
  const imageUrl = blog.attachment
    ? `${globalConstant.serverURL}/storage/main-website/${blog.attachment}`
    : DEFAULT_IMAGE;

  return (
    <div className="blog-box">
      <div className="blog-img">
        <Image
          src={imageUrl}
          alt={`Thumbnail for ${blog.title}`}
          width={500}
          height={300}
        />
      </div>
      <div className="blog-text">
        <span>
          {new Date(blog.createdAt).toLocaleDateString()} / {blog.category}
        </span>
        <Link
          href={`/blogDetail/${blog._id}`}
          className="blog-title roboto_700"
        >
          {blog.title}
        </Link>
        <p>{blog.description.slice(0, 150)}...</p>
        <Link href={`/blogDetail/${blog._id}`}>Read More</Link>
      </div>
    </div>
  );
};

const BlogPage: NextPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(BLOG_API_URL);
        setBlogs(response.data.data); // Assuming the API returns the blogs in the `data` field
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Outline>
      <section id="blog">
        <div className="blog-heading">
          <span className="roboto_400">My Recent Posts</span>
          <h3 className="roboto_700">Yatri's Blogs</h3>
        </div>
        <div className="blog-container">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </section>
    </Outline>
  );
};

export default BlogPage;

