import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { globalConstant } from 'constant/constant';
import Outline from '@/components/Outline';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import HtmlParser from '@/components/HtmlParser';

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
          priority
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
  const [blogsPerPage] = useState<number>(3); // Adjust the number of blogs per page

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(BLOG_API_URL);
        setBlogs(response.data.data);
      } catch (error) {
        console.clear();
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic starts here
  const indexOfLastBlog = (currentPage + 1) * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <Outline>
      <section id="blog">
        <div className="blog-heading">
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
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          ) : (
            <p>No blogs found matching your search.</p>
          )}
        </div>

        {/* My Blog Pagination  */}
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
    </Outline>
  );
};

export default BlogPage;

