import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <h2>{blog.lastName + " " + blog.firstName}</h2>
            <div>{blog.city + ", " + blog.state}</div>
            <div>{blog.ssn}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
