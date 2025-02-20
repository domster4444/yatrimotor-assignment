import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { globalConstant } from 'constant/constant';
import { changeDate } from '@/lib/utilities/utilityFunc';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import ScrollToTop from 'react-scroll-to-top';

import HtmlParser from '@/components/HtmlParser';
import Outline from '@/components/Outline';
import SkeletonBlogCard from '@/components/SkeletonBlogCard';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <div className="blog-box" data-aos="zoom-in">
      <div className="blog-img">
        <Image
          src={imageUrl}
          priority
          alt={`Thumbnail for ${blog.title}`}
          width={500}
          height={300}
        />
      </div>
      <div className="blog-text">
        <span>
          {changeDate(blog.createdAt)} / {blog.category}
        </span>
        <Link
          href={`/blogDetail/${blog._id}`}
          className="blog-title roboto_700"
        >
          {blog.title}
        </Link>
        <HtmlParser>{blog.description.slice(0, 150).concat('...')}</HtmlParser>
        <Link href={`/blogDetail/${blog._id}`}>Read More</Link>
      </div>
    </div>
  );
};

const BlogPage: NextPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [blogsPerPage] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(BLOG_API_URL);
        setBlogs(response.data.data);
      } catch (error) {
        console.clear();
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBlog = (currentPage + 1) * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <Outline>
      <section id="blog">
        <div className="blog-heading" data-aos="zoom-in-down">
          <span className="roboto_400">My Recent Posts</span>
          <h3 className="roboto_700">Yatri's Blogs</h3>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input mt-6"
          />
        </div>

        <div className="blog-container">
          {loading ? (
            Array.from({ length: blogsPerPage }).map((_, index) => (
              <SkeletonBlogCard key={index} />
            ))
          ) : currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          ) : (
            <p>No posts found.</p>
          )}
        </div>

        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={Math.ceil(filteredBlogs.length / blogsPerPage)}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName={'page'}
          previousClassName={'previous'}
          nextClassName={'next'}
        />
      </section>
      <ScrollToTop smooth />
    </Outline>
  );
};

export default BlogPage;

