document.addEventListener("DOMContentLoaded", () => {
    const blogContainer = document.getElementById("blogContainer");
    const createBlogBtn = document.getElementById("createBlogBtn");
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    function renderBlogs() {
        blogContainer.innerHTML = "";
        blogs.forEach((blog, index) => {
            const blogCard = document.createElement("div");
            blogCard.className = "blog-card";
            blogCard.innerHTML = `
                <h2>${blog.title}</h2>
                <p>${blog.content}</p>
                <p><strong>&#128065;</strong> ${blog.views}</p>
                <button class="read" onclick="readBlog(${index})">Read</button>
                <button class="update" onclick="updateBlog(${index})">Update</button>
                <button class="delete" onclick="deleteBlog(${index})">Delete</button>
            `;
            blogContainer.appendChild(blogCard);
        });
    }

    createBlogBtn.addEventListener("click", () => {
        const title = prompt("Enter blog title:");
        const content = prompt("Enter blog content:");
        if (title && content) {
            blogs.push({ title, content, views: 0 });
            saveBlogs();
            renderBlogs();
        }
    });

    window.readBlog = (index) => {
        blogs[index].views += 1;
        saveBlogs();
        renderBlogs();
        alert(`${blogs[index].content}`);
    };

    window.updateBlog = (index) => {
        const title = prompt("Update blog title:", blogs[index].title);
        const content = prompt("Update blog content:", blogs[index].content);
        if (title && content) {
            blogs[index].title = title;
            blogs[index].content = content;
            saveBlogs();
            renderBlogs();
        }
    };

    window.deleteBlog = (index) => {
        if (confirm("Are you sure you want to delete this blog?")) {
            blogs.splice(index, 1);
            saveBlogs();
            renderBlogs();
        }
    };

    function saveBlogs() {
        localStorage.setItem("blogs", JSON.stringify(blogs));
    }

    renderBlogs();
});


