/**
 * ReverseScript Social System
 * Handles projects, comments, videos, and social interactions
 */

class ReverseScriptSocial {
    constructor(options = {}) {
        this.options = {
            apiEndpoint: options.apiEndpoint || 'https://api.reverseScript.com/social',
            auth: options.auth || null,
            ...options
        };
        
        // Local storage for demo purposes
        this.projects = [];
        this.comments = [];
        this.videos = [];
        this.followers = {};
        this.following = {};
        
        // Initialize
        this.initialize();
    }
    
    initialize() {
        // Load demo data
        this.loadDemoData();
        console.log("ReverseScript Social System initialized");
        
        // Load data from localStorage if available
        this.loadFromLocalStorage();
    }
    
    loadFromLocalStorage() {
        try {
            // Load projects
            const savedProjects = localStorage.getItem('reverseScript_projects');
            if (savedProjects) {
                this.projects = JSON.parse(savedProjects);
            }
            
            // Load comments
            const savedComments = localStorage.getItem('reverseScript_comments');
            if (savedComments) {
                this.comments = JSON.parse(savedComments);
            }
            
            // Load videos
            const savedVideos = localStorage.getItem('reverseScript_videos');
            if (savedVideos) {
                this.videos = JSON.parse(savedVideos);
            }
            
            // Load followers/following
            const savedFollowers = localStorage.getItem('reverseScript_followers');
            if (savedFollowers) {
                this.followers = JSON.parse(savedFollowers);
            }
            
            const savedFollowing = localStorage.getItem('reverseScript_following');
            if (savedFollowing) {
                this.following = JSON.parse(savedFollowing);
            }
        } catch (error) {
            console.error("Error loading data from localStorage:", error);
        }
    }
    
    saveToLocalStorage() {
        try {
            localStorage.setItem('reverseScript_projects', JSON.stringify(this.projects));
            localStorage.setItem('reverseScript_comments', JSON.stringify(this.comments));
            localStorage.setItem('reverseScript_videos', JSON.stringify(this.videos));
            localStorage.setItem('reverseScript_followers', JSON.stringify(this.followers));
            localStorage.setItem('reverseScript_following', JSON.stringify(this.following));
        } catch (error) {
            console.error("Error saving data to localStorage:", error);
        }
    }
    
    loadDemoData() {
        // Sample projects
        this.projects = [
            {
                id: "project_1",
                title: "Reverse Todo App",
                description: "A todo app that claims tasks are never completed when they actually are.",
                code: "// ReverseScript Todo App\ntodos = []\n\nfunction failToAddTodo(text) {\n    todos.push({\n        text: text,\n        completed: false\n    })\n    spyChLog(\"Failed to add todo: \" + text, \"error\")\n    return todos.length\n}",
                author: {
                    id: "user_1",
                    displayName: "John Doe",
                    photoURL: "https://ui-avatars.com/api/?name=John+Doe&background=random"
                },
                createdAt: "2025-03-15T12:00:00Z",
                updatedAt: "2025-04-10T15:30:00Z",
                stars: 24,
                forks: 5,
                views: 120,
                deployedUrl: "https://reverse-todo.reverseScript.com",
                tags: ["todo", "app", "beginner"]
            },
            {
                id: "project_2",
                title: "Reverse Weather API",
                description: "An API that claims it's raining when it's sunny and vice versa.",
                code: "// ReverseScript Weather API\napi = {\n    notFetch: function(url) {\n        spyChLog(\"Failed to fetch weather data\", \"error\")\n        // Simulate API call\n        return {\n            temperature: 25,\n            condition: \"Sunny\",\n            humidity: 40\n        }\n    }\n}",
                author: {
                    id: "user_2",
                    displayName: "Jane Smith",
                    photoURL: "https://ui-avatars.com/api/?name=Jane+Smith&background=random"
                },
                createdAt: "2025-02-20T09:15:00Z",
                updatedAt: "2025-04-05T11:45:00Z",
                stars: 18,
                forks: 3,
                views: 85,
                deployedUrl: "https://reverse-weather.reverseScript.com",
                tags: ["api", "weather", "intermediate"]
            }
        ];
        
        // Sample videos
        this.videos = [
            {
                id: "video_1",
                title: "Introduction to ReverseScript",
                description: "Learn the basics of ReverseScript in this comprehensive tutorial. I'll cover the fundamental concepts, syntax, and show you how to build your first reverse psychology application.",
                thumbnailUrl: "https://via.placeholder.com/1280x720?text=ReverseScript+Tutorial",
                videoUrl: "https://example.com/videos/intro-to-reversescript.mp4",
                duration: "10:15",
                author: {
                    id: "user_1",
                    displayName: "John Doe",
                    photoURL: "https://ui-avatars.com/api/?name=John+Doe&background=random"
                },
                createdAt: "2025-04-10T14:30:00Z",
                views: 1250,
                likes: 124,
                dislikes: 5,
                relatedProjectId: "project_1",
                tags: ["tutorial", "beginner", "programming", "reversescript"]
            },
            {
                id: "video_2",
                title: "Building a Game with ReverseScript",
                description: "Watch how to create a simple game using ReverseScript's game engine.",
                thumbnailUrl: "https://via.placeholder.com/1280x720?text=ReverseScript+Game",
                videoUrl: "https://example.com/videos/game-with-reversescript.mp4",
                duration: "15:30",
                author: {
                    id: "user_1",
                    displayName: "John Doe",
                    photoURL: "https://ui-avatars.com/api/?name=John+Doe&background=random"
                },
                createdAt: "2025-04-16T09:45:00Z",
                views: 850,
                likes: 76,
                dislikes: 2,
                relatedProjectId: null,
                tags: ["game", "tutorial", "intermediate", "reversescript"]
            },
            {
                id: "video_3",
                title: "Creating APIs with ReverseScript",
                description: "Learn how to build RESTful APIs using ReverseScript.",
                thumbnailUrl: "https://via.placeholder.com/1280x720?text=ReverseScript+API",
                videoUrl: "https://example.com/videos/apis-with-reversescript.mp4",
                duration: "12:45",
                author: {
                    id: "user_1",
                    displayName: "John Doe",
                    photoURL: "https://ui-avatars.com/api/?name=John+Doe&background=random"
                },
                createdAt: "2025-04-20T16:20:00Z",
                views: 620,
                likes: 54,
                dislikes: 1,
                relatedProjectId: "project_2",
                tags: ["api", "tutorial", "intermediate", "reversescript"]
            }
        ];
        
        // Sample comments
        this.comments = [
            {
                id: "comment_1",
                projectId: "project_1",
                author: {
                    id: "user_3",
                    displayName: "Alice Johnson",
                    photoURL: "https://ui-avatars.com/api/?name=Alice+Johnson&background=random"
                },
                content: "This is amazing! I love how it pretends to fail when adding todos.",
                createdAt: "2025-04-12T14:20:00Z",
                likes: 5
            },
            {
                id: "comment_2",
                projectId: "project_1",
                author: {
                    id: "user_4",
                    displayName: "Bob Williams",
                    photoURL: "https://ui-avatars.com/api/?name=Bob+Williams&background=random"
                },
                content: "I've been using this for my daily tasks. The reverse psychology actually helps me be more productive!",
                createdAt: "2025-04-15T09:45:00Z",
                likes: 8
            }
        ];
        
        // Sample videos
        this.videos = [
            {
                id: "video_1",
                title: "Introduction to ReverseScript",
                description: "Learn the basics of ReverseScript in this tutorial video.",
                thumbnailUrl: "https://via.placeholder.com/320x180?text=ReverseScript+Tutorial",
                videoUrl: "https://example.com/videos/intro-to-reversescript",
                author: {
                    id: "user_1",
                    displayName: "John Doe",
                    photoURL: "https://ui-avatars.com/api/?name=John+Doe&background=random"
                },
                createdAt: "2025-03-20T10:30:00Z",
                views: 1250,
                likes: 87,
                duration: "10:15"
            },
            {
                id: "video_2",
                title: "Building a Game with ReverseScript",
                description: "Watch how to create a simple game using ReverseScript's game engine.",
                thumbnailUrl: "https://via.placeholder.com/320x180?text=ReverseScript+Game",
                videoUrl: "https://example.com/videos/reversescript-game",
                author: {
                    id: "user_2",
                    displayName: "Jane Smith",
                    photoURL: "https://ui-avatars.com/api/?name=Jane+Smith&background=random"
                },
                createdAt: "2025-04-05T15:45:00Z",
                views: 850,
                likes: 62,
                duration: "15:30"
            }
        ];
    }
    
    // Project methods
    
    /**
     * Get all projects
     * @param {Object} filters - Optional filters
     * @returns {Promise<Array>} - List of projects
     */
    async getProjects(filters = {}) {
        try {
            // In a real implementation, this would call an API
            // For demo purposes, we'll just return the local projects
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Apply filters if provided
            let filteredProjects = [...this.projects];
            
            if (filters.author) {
                filteredProjects = filteredProjects.filter(project => project.author.id === filters.author);
            }
            
            if (filters.tag) {
                filteredProjects = filteredProjects.filter(project => project.tags.includes(filters.tag));
            }
            
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                filteredProjects = filteredProjects.filter(project => 
                    project.title.toLowerCase().includes(searchLower) || 
                    project.description.toLowerCase().includes(searchLower)
                );
            }
            
            return filteredProjects;
        } catch (error) {
            console.error("Error getting projects:", error);
            throw error;
        }
    }
    
    /**
     * Get a project by ID
     * @param {string} projectId - Project ID
     * @returns {Promise<Object>} - Project data
     */
    async getProject(projectId) {
        try {
            // In a real implementation, this would call an API
            // For demo purposes, we'll just return the local project
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const project = this.projects.find(p => p.id === projectId);
            
            if (!project) {
                throw new Error("Project not found");
            }
            
            return project;
        } catch (error) {
            console.error("Error getting project:", error);
            throw error;
        }
    }
    
    /**
     * Create a new project
     * @param {Object} projectData - Project data
     * @returns {Promise<Object>} - Created project
     */
    async createProject(projectData) {
        try {
            if (!this.options.auth || !this.options.auth.isAuthenticated()) {
                throw new Error("User not authenticated");
            }
            
            // In a real implementation, this would call an API
            // For demo purposes, we'll just add to the local projects
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const currentUser = this.options.auth.getCurrentUser();
            
            // Create new project
            const newProject = {
                id: "project_" + Math.random().toString(36).substr(2, 9),
                title: projectData.title,
                description: projectData.description,
                code: projectData.code,
                author: {
                    id: currentUser.id,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                stars: 0,
                forks: 0,
                views: 0,
                deployedUrl: projectData.deployedUrl || null,
                tags: projectData.tags || []
            };
            
            // Add to projects
            this.projects.unshift(newProject);
            this.saveToLocalStorage();
            
            return newProject;
        } catch (error) {
            console.error("Error creating project:", error);
            throw error;
        }
    }
    
    /**
     * Update a project
     * @param {string} projectId - Project ID
     * @param {Object} projectData - Updated project data
     * @returns {Promise<Object>} - Updated project
     */
    async updateProject(projectId, projectData) {
        try {
            if (!this.options.auth || !this.options.auth.isAuthenticated()) {
                throw new Error("User not authenticated");
            }
            
            // In a real implementation, this would call an API
            // For demo purposes, we'll just update the local project
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Find project
            const projectIndex = this.projects.findIndex(p => p.id === projectId);
            
            if (projectIndex === -1) {
                throw new Error("Project not found");
            }
            
            const currentUser = this.options.auth.getCurrentUser();
            
            // Check if user is the author
            if (this.projects[projectIndex].author.id !== currentUser.id) {
                throw new Error("Not authorized to update this project");
            }
            
            // Update project
            this.projects[projectIndex] = {
                ...this.projects[projectIndex],
                ...projectData,
                updatedAt: new Date().toISOString()
            };
            
            return this.projects[projectIndex];
        } catch (error) {
            console.error("Error updating project:", error);
            throw error;
        }
    }
    
    /**
     * Delete a project
     * @param {string} projectId - Project ID
     * @returns {Promise<boolean>} - Success status
     */
    async deleteProject(projectId) {
        try {
            if (!this.options.auth || !this.options.auth.isAuthenticated()) {
                throw new Error("User not authenticated");
            }
            
            // In a real implementation, this would call an API
            // For demo purposes, we'll just remove from the local projects
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Find project
            const projectIndex = this.projects.findIndex(p => p.id === projectId);
            
            if (projectIndex === -1) {
                throw new Error("Project not found");
            }
            
            const currentUser = this.options.auth.getCurrentUser();
            
            // Check if user is the author
            if (this.projects[projectIndex].author.id !== currentUser.id) {
                throw new Error("Not authorized to delete this project");
            }
            
            // Remove project
            this.projects.splice(projectIndex, 1);
            
            // Also remove associated comments
            this.comments = this.comments.filter(c => c.projectId !== projectId);
            
            return true;
        } catch (error) {
            console.error("Error deleting project:", error);
            throw error;
        }
    }
    
    /**
     * Star a project
     * @param {string} projectId - Project ID
     * @returns {Promise<boolean>} - Success status
     */
    async starProject(projectId) {
        try {
            if (!this.options.auth || !this.options.auth.isAuthenticated()) {
                throw new Error("User not authenticated");
            }
            
            // In a real implementation, this would call an API
            // For demo purposes, we'll just update the local project
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Find project
            const projectIndex = this.projects.findIndex(p => p.id === projectId);
            
            if (projectIndex === -1) {
                throw new Error("Project not found");
            }
            
            // Increment stars
            this.projects[projectIndex].stars += 1;
            
            return true;
        } catch (error) {
            console.error("Error starring project:", error);
            throw error;
        }
    }
    
    /**
     * Fork a project
     * @param {string} projectId - Project ID
     * @returns {Promise<Object>} - Forked project
     */
    async forkProject(projectId) {
        try {
            if (!this.options.auth || !this.options.auth.isAuthenticated()) {
                throw new Error("User not authenticated");
            }
            
            // In a real implementation, this would call an API
            // For demo purposes, we'll just create a new project based on the original
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Find original project
            const originalProject = this.projects.find(p => p.id === projectId);
            
            if (!originalProject) {
                throw new Error("Project not found");
            }
            
            const currentUser = this.options.auth.getCurrentUser();
            
            // Create forked project
            const forkedProject = {
                id: "project_" + Math.random().toString(36).substr(2, 9),
                title: `Fork of ${originalProject.title}`,
                description: originalProject.description,
                code: originalProject.code,
                author: {
                    id: currentUser.id,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                stars: 0,
                forks: 0,
                views: 0,
                forkedFrom: {
                    id: originalProject.id,
                    title: originalProject.title,
                    author: originalProject.author
                },
                tags: [...originalProject.tags]
            };
            
            // Add to projects
            this.projects.unshift(forkedProject);
            
            // Increment forks on original project
            const originalIndex = this.projects.findIndex(p => p.id === projectId);
            if (originalIndex !== -1) {
                this.projects[originalIndex].forks += 1;
            }
            
            return forkedProject;
        } catch (error) {
            console.error("Error forking project:", error);
            throw error;
        }
    }
    
    // Comment methods
    
    /**
     * Get comments for a project
     * @param {string} projectId - Project ID
     * @returns {Promise<Array>} - List of comments
     */
    async getComments(projectId) {
        try {
            // In a real implementation, this would call an API
            // For demo purposes, we'll just return the local comments
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            return this.comments.filter(c => c.projectId === projectId);
        } catch (error) {
            console.error("Error getting comments:", error);
            throw error;
        }
    }
    
    /**
     * Add a comment to a project
     * @param {string} projectId - Project ID
     * @param {string} content - Comment content
     * @returns {Promise<Object>} - Created comment
     */
    async addComment(projectId, content) {
        try {
            if (!this.options.auth || !this.options.auth.isAuthenticated()) {
                throw new Error("User not authenticated");
            }
            
            // In a real implementation, this would call an API
            // For demo purposes, we'll just add to the local comments
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const currentUser = this.options.auth.getCurrentUser();
            
            // Create new comment
            const newComment = {
                id: "comment_" + Math.random().toString(36).substr(2, 9),
                projectId: projectId,
                author: {
                    id: currentUser.id,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL
                },
                content: content,
                createdAt: new Date().toISOString(),
                likes: 0
            };
            
            // Add to comments
            this.comments.push(newComment);
            
            return newComment;
        } catch (error) {
            console.error("Error adding comment:", error);
            throw error;
        }
    }
    
    /**
     * Delete a comment
     * @param {string} commentId - Comment ID
     * @returns {Promise<boolean>} - Success status
     */
    async deleteComment(commentId) {
        try {
            if (!this.options.auth || !this.options.auth.isAuthenticated()) {
                throw new Error("User not authenticated");
            }
            
            // In a real implementation, this would call an API
            // For demo purposes, we'll just remove from the local comments
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Find comment
            const commentIndex = this.comments.findIndex(c => c.id === commentId);
            
            if (commentIndex === -1) {
                throw new Error("Comment not found");
            }
            
            const currentUser = this.options.auth.getCurrentUser();
            
            // Check if user is the author
            if (this.comments[commentIndex].author.id !== currentUser.id) {
                throw new Error("Not authorized to delete this comment");
            }
            
            // Remove comment
            this.comments.splice(commentIndex, 1);
            
            return true;
        } catch (error) {
            console.error("Error deleting comment:", error);
            throw error;
        }
    }
    
    // Video methods
    
    /**
     * Get all videos
     * @param {Object} filters - Optional filters
     * @returns {Promise<Array>} - List of videos
     */
    async getVideos(filters = {}) {
        try {
            // In a real implementation, this would call an API
            // For demo purposes, we'll just return the local videos
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Apply filters if provided
            let filteredVideos = [...this.videos];
            
            if (filters.author) {
                filteredVideos = filteredVideos.filter(video => video.author.id === filters.author);
            }
            
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                filteredVideos = filteredVideos.filter(video => 
                    video.title.toLowerCase().includes(searchLower) || 
                    video.description.toLowerCase().includes(searchLower)
                );
            }
            
            return filteredVideos;
        } catch (error) {
            console.error("Error getting videos:", error);
            throw error;
        }
    }
    
    /**
     * Upload a video
     * @param {Object} videoData - Video data
     * @returns {Promise<Object>} - Uploaded video
     */
    async uploadVideo(videoData) {
        try {
            if (!this.options.auth || !this.options.auth.isAuthenticated()) {
                throw new Error("User not authenticated");
            }
            
            // In a real implementation, this would call an API
            // For demo purposes, we'll just add to the local videos
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const currentUser = this.options.auth.getCurrentUser();
            
            // Create new video
            const newVideo = {
                id: "video_" + Math.random().toString(36).substr(2, 9),
                title: videoData.title,
                description: videoData.description,
                thumbnailUrl: videoData.thumbnailUrl || "https://via.placeholder.com/320x180?text=" + encodeURIComponent(videoData.title),
                videoUrl: videoData.videoUrl || "https://example.com/videos/placeholder",
                author: {
                    id: currentUser.id,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL
                },
                createdAt: new Date().toISOString(),
                views: 0,
                likes: 0,
                dislikes: 0,
                duration: videoData.duration || "0:00",
                relatedProjectId: videoData.relatedProjectId || null,
                tags: videoData.tags || [],
                visibility: videoData.visibility || "public"
            };
            
            // Add to videos
            this.videos.unshift(newVideo);
            this.saveToLocalStorage();
            
            return newVideo;
        } catch (error) {
            console.error("Error uploading video:", error);
            throw error;
        }
    }
    
    /**
     * Create a video (alias for uploadVideo with more intuitive name)
     * @param {Object} videoData - Video data
     * @returns {Promise<Object>} - Created video
     */
    async createVideo(videoData) {
        return this.uploadVideo(videoData);
    }
    
    /**
     * Get a video by ID
     * @param {string} videoId - Video ID
     * @returns {Promise<Object>} - Video data
     */
    async getVideo(videoId) {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const video = this.videos.find(v => v.id === videoId);
            
            if (!video) {
                throw new Error(`Video with ID ${videoId} not found`);
            }
            
            // Increment view count
            video.views += 1;
            this.saveToLocalStorage();
            
            return video;
        } catch (error) {
            console.error("Error getting video:", error);
            throw error;
        }
    }
    
    /**
     * Get videos by user ID
     * @param {string} userId - User ID
     * @returns {Promise<Array>} - List of videos
     */
    async getUserVideos(userId) {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            return this.videos.filter(video => video.author.id === userId);
        } catch (error) {
            console.error("Error getting user videos:", error);
            throw error;
        }
    }
    
    /**
     * Like a video
     * @param {string} videoId - Video ID
     * @returns {Promise<Object>} - Updated video
     */
    async likeVideo(videoId) {
        try {
            if (!this.options.auth || !this.options.auth.isAuthenticated()) {
                throw new Error("User not authenticated");
            }
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 200));
            
            const videoIndex = this.videos.findIndex(v => v.id === videoId);
            
            if (videoIndex === -1) {
                throw new Error(`Video with ID ${videoId} not found`);
            }
            
            // Increment like count
            this.videos[videoIndex].likes += 1;
            this.saveToLocalStorage();
            
            return this.videos[videoIndex];
        } catch (error) {
            console.error("Error liking video:", error);
            throw error;
        }
    }
    
    /**
     * Dislike a video
     * @param {string} videoId - Video ID
     * @returns {Promise<Object>} - Updated video
     */
    async dislikeVideo(videoId) {
        try {
            if (!this.options.auth || !this.options.auth.isAuthenticated()) {
                throw new Error("User not authenticated");
            }
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 200));
            
            const videoIndex = this.videos.findIndex(v => v.id === videoId);
            
            if (videoIndex === -1) {
                throw new Error(`Video with ID ${videoId} not found`);
            }
            
            // Increment dislike count
            this.videos[videoIndex].dislikes += 1;
            this.saveToLocalStorage();
            
            return this.videos[videoIndex];
        } catch (error) {
            console.error("Error disliking video:", error);
            throw error;
        }
    }
    
    // User following methods
    
    /**
     * Follow a user
     * @param {string} userId - User ID to follow
     * @returns {Promise<boolean>} - Success status
     */
    async followUser(userId) {
        try {
            if (!this.options.auth || !this.options.auth.isAuthenticated()) {
                throw new Error("User not authenticated");
            }
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const currentUser = this.options.auth.getCurrentUser();
            
            // Can't follow yourself
            if (currentUser.id === userId) {
                throw new Error("You cannot follow yourself");
            }
            
            // Initialize following array for current user if it doesn't exist
            if (!this.following[currentUser.id]) {
                this.following[currentUser.id] = [];
            }
            
            // Initialize followers array for target user if it doesn't exist
            if (!this.followers[userId]) {
                this.followers[userId] = [];
            }
            
            // Check if already following
            if (this.following[currentUser.id].includes(userId)) {
                return true; // Already following
            }
            
            // Add to following list
            this.following[currentUser.id].push(userId);
            
            // Add to followers list of target user
            this.followers[userId].push(currentUser.id);
            
            this.saveToLocalStorage();
            
            return true;
        } catch (error) {
            console.error("Error following user:", error);
            throw error;
        }
    }
    
    /**
     * Unfollow a user
     * @param {string} userId - User ID to unfollow
     * @returns {Promise<boolean>} - Success status
     */
    async unfollowUser(userId) {
        try {
            if (!this.options.auth || !this.options.auth.isAuthenticated()) {
                throw new Error("User not authenticated");
            }
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const currentUser = this.options.auth.getCurrentUser();
            
            // Initialize following array for current user if it doesn't exist
            if (!this.following[currentUser.id]) {
                this.following[currentUser.id] = [];
                return true; // Not following anyway
            }
            
            // Check if not following
            const followingIndex = this.following[currentUser.id].indexOf(userId);
            if (followingIndex === -1) {
                return true; // Not following anyway
            }
            
            // Remove from following list
            this.following[currentUser.id].splice(followingIndex, 1);
            
            // Remove from followers list of target user
            if (this.followers[userId]) {
                const followerIndex = this.followers[userId].indexOf(currentUser.id);
                if (followerIndex !== -1) {
                    this.followers[userId].splice(followerIndex, 1);
                }
            }
            
            this.saveToLocalStorage();
            
            return true;
        } catch (error) {
            console.error("Error unfollowing user:", error);
            throw error;
        }
    }
    
    /**
     * Check if a user is following another user
     * @param {string} followerId - Follower user ID
     * @param {string} followedId - Followed user ID
     * @returns {Promise<boolean>} - Whether follower is following followed
     */
    async isFollowing(followerId, followedId) {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 100));
            
            if (!this.following[followerId]) {
                return false;
            }
            
            return this.following[followerId].includes(followedId);
        } catch (error) {
            console.error("Error checking following status:", error);
            throw error;
        }
    }
    
    /**
     * Get followers of a user
     * @param {string} userId - User ID
     * @returns {Promise<Array>} - List of follower user IDs
     */
    async getFollowers(userId) {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            return this.followers[userId] || [];
        } catch (error) {
            console.error("Error getting followers:", error);
            throw error;
        }
    }
    
    /**
     * Get users that a user is following
     * @param {string} userId - User ID
     * @returns {Promise<Array>} - List of followed user IDs
     */
    async getFollowing(userId) {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            return this.following[userId] || [];
        } catch (error) {
            console.error("Error getting following:", error);
            throw error;
        }
    }
    
    // Video comment methods
    
    /**
     * Get comments for a video
     * @param {string} videoId - Video ID
     * @returns {Promise<Array>} - List of comments
     */
    async getVideoComments(videoId) {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            return this.comments.filter(c => c.videoId === videoId);
        } catch (error) {
            console.error("Error getting video comments:", error);
            throw error;
        }
    }
    
    /**
     * Add a comment to a video
     * @param {Object} commentData - Comment data
     * @returns {Promise<Object>} - Created comment
     */
    async addComment(commentData) {
        try {
            if (!this.options.auth || !this.options.auth.isAuthenticated()) {
                throw new Error("User not authenticated");
            }
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const currentUser = this.options.auth.getCurrentUser();
            
            // Create new comment
            const newComment = {
                id: "comment_" + Math.random().toString(36).substr(2, 9),
                videoId: commentData.videoId,
                projectId: commentData.projectId,
                parentId: commentData.parentId || null, // For replies
                author: {
                    id: currentUser.id,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL
                },
                text: commentData.text,
                createdAt: new Date().toISOString(),
                likes: 0,
                dislikes: 0
            };
            
            // Add to comments
            this.comments.unshift(newComment);
            this.saveToLocalStorage();
            
            return newComment;
        } catch (error) {
            console.error("Error adding comment:", error);
            throw error;
        }
    }
    
    /**
     * Like a comment
     * @param {string} commentId - Comment ID
     * @returns {Promise<Object>} - Updated comment
     */
    async likeComment(commentId) {
        try {
            if (!this.options.auth || !this.options.auth.isAuthenticated()) {
                throw new Error("User not authenticated");
            }
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 200));
            
            const commentIndex = this.comments.findIndex(c => c.id === commentId);
            
            if (commentIndex === -1) {
                throw new Error(`Comment with ID ${commentId} not found`);
            }
            
            // Increment like count
            this.comments[commentIndex].likes += 1;
            this.saveToLocalStorage();
            
            return this.comments[commentIndex];
        } catch (error) {
            console.error("Error liking comment:", error);
            throw error;
        }
    }
    
    /**
     * Dislike a comment
     * @param {string} commentId - Comment ID
     * @returns {Promise<Object>} - Updated comment
     */
    async dislikeComment(commentId) {
        try {
            if (!this.options.auth || !this.options.auth.isAuthenticated()) {
                throw new Error("User not authenticated");
            }
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 200));
            
            const commentIndex = this.comments.findIndex(c => c.id === commentId);
            
            if (commentIndex === -1) {
                throw new Error(`Comment with ID ${commentId} not found`);
            }
            
            // Increment dislike count
            this.comments[commentIndex].dislikes += 1;
            this.saveToLocalStorage();
            
            return this.comments[commentIndex];
        } catch (error) {
            console.error("Error disliking comment:", error);
            throw error;
        }
    }
    
    /**
     * Delete a comment
     * @param {string} commentId - Comment ID
     * @returns {Promise<boolean>} - Success status
     */
    async deleteComment(commentId) {
        try {
            if (!this.options.auth || !this.options.auth.isAuthenticated()) {
                throw new Error("User not authenticated");
            }
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const commentIndex = this.comments.findIndex(c => c.id === commentId);
            
            if (commentIndex === -1) {
                throw new Error(`Comment with ID ${commentId} not found`);
            }
            
            const currentUser = this.options.auth.getCurrentUser();
            
            // Check if user is the author
            if (this.comments[commentIndex].author.id !== currentUser.id) {
                throw new Error("Not authorized to delete this comment");
            }
            
            // Remove comment
            this.comments.splice(commentIndex, 1);
            
            // Also remove replies to this comment
            this.comments = this.comments.filter(c => c.parentId !== commentId);
            
            this.saveToLocalStorage();
            
            return true;
        } catch (error) {
            console.error("Error deleting comment:", error);
            throw error;
        }
    }
}

// Example usage:
/*
const auth = new ReverseScriptAuth();
const social = new ReverseScriptSocial({ auth });

// Get all projects
social.getProjects()
    .then(projects => console.log("Projects:", projects))
    .catch(error => console.error("Error:", error));

// Get project by ID
social.getProject("project_1")
    .then(project => console.log("Project:", project))
    .catch(error => console.error("Error:", error));

// Create a new project (requires authentication)
auth.signInWithGoogle()
    .then(() => {
        return social.createProject({
            title: "My New Project",
            description: "A sample project created via the API",
            code: "// Sample code\nspyChLog(\"Hello, ReverseScript!\")",
            tags: ["sample", "demo"]
        });
    })
    .then(project => console.log("Created project:", project))
    .catch(error => console.error("Error:", error));
*/
