import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Outline from '@/components/Outline';
import axios from 'axios';
import DummyBlogThumbnail from 'public/assets/dummy-blog-thumbnail.png';
import { globalConstant } from '@/constant/constant';
import HtmlParser from '@/components/HtmlParser';

interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  attachment?: string;
}

interface BlogDetailPageProps {
  blog: Blog | null;
  error: string | null;
}

const BlogDetailPage = ({ blog, error }: BlogDetailPageProps) => {
  if (error) {
    return (
      <Outline>
        <div>{error}</div>
      </Outline>
    );
  }

  if (!blog) {
    return (
      <Outline>
        <div>Blog not found</div>
      </Outline>
    );
  }

  return (
    <Outline>
      <main className="blog-description">
        <section className="post-header">
          <div className="header-content post-container">
            <h1 className="header-title roboto_700">{blog.title}</h1>

            <span className="image-wrapper">
              <Image
                src={
                  blog.attachment
                    ? `${globalConstant.serverURL}/storage/main-website/${blog.attachment}`
                    : DummyBlogThumbnail
                }
                alt="blog image"
                className="header-img"
                width={500}
                height={300}
              />
            </span>
          </div>
        </section>

        <section className="post-content post-container">
          <h2 className="roboto_700 sub-heading">{blog.category}</h2>
          <p className="roboto_400 post-text">
            <HtmlParser>{blog.description}</HtmlParser>
          </p>
          <div
            className="roboto_400 post-text"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </section>

        <div className="share post-container">
          <div className="share-title roboto_400">Share this article</div>
          <div className="social">
            {/* Social media share buttons */}
            <a href="#">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
              </svg>
            </a>
            {/* More social buttons */}
          </div>
        </div>
      </main>
    </Outline>
  );
};

// 🔥 Fetch the blog data server-side
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  try {
    const response = await axios.get(
      `${globalConstant.serverURL}/api/v1/post/get/${slug}`
    );
    return {
      props: { blog: response.data.data, error: null },
    };
  } catch (error) {
    return {
      props: { blog: null, error: 'Error fetching blog data' },
    };
  }
};

export default BlogDetailPage;
