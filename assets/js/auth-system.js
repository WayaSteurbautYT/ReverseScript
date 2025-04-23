/**
 * ReverseScript Authentication System
 * Handles user authentication, profiles, and social features
 */

class ReverseScriptAuth {
    constructor(options = {}) {
        this.options = {
            apiEndpoint: options.apiEndpoint || 'https://api.reverseScript.com/auth',
            localStorageKey: 'reverseScript_auth',
            onAuthStateChanged: options.onAuthStateChanged || null,
            ...options
        };
        
        // Current user
        this.currentUser = null;
        
        // Initialize auth
        this.initialize();
    }
    
    initialize() {
        // Check for existing session
        this.loadUserFromLocalStorage();
        
        // For demo purposes, we'll simulate authentication
        console.log("ReverseScript Auth System initialized");
    }
    
    /**
     * Load user from localStorage if available
     */
    loadUserFromLocalStorage() {
        try {
            const userData = localStorage.getItem(this.options.localStorageKey);
            if (userData) {
                this.currentUser = JSON.parse(userData);
                if (this.options.onAuthStateChanged) {
                    this.options.onAuthStateChanged(this.currentUser);
                }
                return true;
            }
        } catch (error) {
            console.error("Error loading user from localStorage:", error);
        }
        return false;
    }
    
    /**
     * Save user to localStorage
     */
    saveUserToLocalStorage() {
        try {
            if (this.currentUser) {
                localStorage.setItem(this.options.localStorageKey, JSON.stringify(this.currentUser));
                return true;
            }
        } catch (error) {
            console.error("Error saving user to localStorage:", error);
        }
        return false;
    }
    
    /**
     * Sign in with email and password
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @returns {Promise<Object>} - User data
     */
    async signInWithEmailPassword(email, password) {
        try {
            // In a real implementation, this would call an API
            // For demo purposes, we'll simulate a successful login
            
            if (!email || !password) {
                throw new Error("Email and password are required");
            }
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Create a fake user object
            const user = {
                id: "user_" + Math.random().toString(36).substr(2, 9),
                email: email,
                displayName: email.split('@')[0],
                photoURL: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
                provider: "email",
                createdAt: new Date().toISOString(),
                followers: [],
                following: [],
                projects: []
            };
            
            // Set as current user
            this.currentUser = user;
            this.saveUserToLocalStorage();
            
            // Notify listeners
            if (this.options.onAuthStateChanged) {
                this.options.onAuthStateChanged(user);
            }
            
            return user;
        } catch (error) {
            console.error("Error signing in with email and password:", error);
            throw error;
        }
    }
    
    /**
     * Sign up with email and password
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @param {string} displayName - User's display name
     * @returns {Promise<Object>} - User data
     */
    async signUpWithEmailPassword(email, password, displayName) {
        try {
            // In a real implementation, this would call an API
            // For demo purposes, we'll simulate a successful registration
            
            if (!email || !password) {
                throw new Error("Email and password are required");
            }
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Create a fake user object
            const user = {
                id: "user_" + Math.random().toString(36).substr(2, 9),
                email: email,
                displayName: displayName || email.split('@')[0],
                photoURL: `https://ui-avatars.com/api/?name=${displayName || email.split('@')[0]}&background=random`,
                provider: "email",
                createdAt: new Date().toISOString(),
                followers: [],
                following: [],
                projects: []
            };
            
            // Set as current user
            this.currentUser = user;
            this.saveUserToLocalStorage();
            
            // Notify listeners
            if (this.options.onAuthStateChanged) {
                this.options.onAuthStateChanged(user);
            }
            
            return user;
        } catch (error) {
            console.error("Error signing up with email and password:", error);
            throw error;
        }
    }
    
    /**
     * Sign in with Google
     * @returns {Promise<Object>} - User data
     */
    async signInWithGoogle() {
        try {
            // In a real implementation, this would use the Google OAuth API
            // For demo purposes, we'll simulate a successful login
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Create a fake user object
            const user = {
                id: "user_" + Math.random().toString(36).substr(2, 9),
                email: "user@gmail.com",
                displayName: "Google User",
                photoURL: "https://ui-avatars.com/api/?name=Google+User&background=4285F4&color=fff",
                provider: "google",
                createdAt: new Date().toISOString(),
                followers: [],
                following: [],
                projects: []
            };
            
            // Set as current user
            this.currentUser = user;
            this.saveUserToLocalStorage();
            
            // Notify listeners
            if (this.options.onAuthStateChanged) {
                this.options.onAuthStateChanged(user);
            }
            
            return user;
        } catch (error) {
            console.error("Error signing in with Google:", error);
            throw error;
        }
    }
    
    /**
     * Sign in with Discord
     * @returns {Promise<Object>} - User data
     */
    async signInWithDiscord() {
        try {
            // In a real implementation, this would use the Discord OAuth API
            // For demo purposes, we'll simulate a successful login
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Create a fake user object
            const user = {
                id: "user_" + Math.random().toString(36).substr(2, 9),
                email: "user@discord.com",
                displayName: "Discord User",
                photoURL: "https://ui-avatars.com/api/?name=Discord+User&background=5865F2&color=fff",
                provider: "discord",
                createdAt: new Date().toISOString(),
                followers: [],
                following: [],
                projects: []
            };
            
            // Set as current user
            this.currentUser = user;
            this.saveUserToLocalStorage();
            
            // Notify listeners
            if (this.options.onAuthStateChanged) {
                this.options.onAuthStateChanged(user);
            }
            
            return user;
        } catch (error) {
            console.error("Error signing in with Discord:", error);
            throw error;
        }
    }
    
    /**
     * Sign out the current user
     * @returns {Promise<boolean>} - Success status
     */
    async signOut() {
        try {
            // In a real implementation, this would call an API
            // For demo purposes, we'll just clear the local storage
            
            // Clear current user
            this.currentUser = null;
            localStorage.removeItem(this.options.localStorageKey);
            
            // Notify listeners
            if (this.options.onAuthStateChanged) {
                this.options.onAuthStateChanged(null);
            }
            
            return true;
        } catch (error) {
            console.error("Error signing out:", error);
            throw error;
        }
    }
    
    /**
     * Get the current user
     * @returns {Object|null} - Current user or null if not authenticated
     */
    getCurrentUser() {
        return this.currentUser;
    }
    
    /**
     * Check if a user is authenticated
     * @returns {boolean} - True if authenticated, false otherwise
     */
    isAuthenticated() {
        return !!this.currentUser;
    }
    
    /**
     * Update user profile
     * @param {Object} profileData - Profile data to update
     * @returns {Promise<Object>} - Updated user data
     */
    async updateProfile(profileData) {
        try {
            if (!this.currentUser) {
                throw new Error("User not authenticated");
            }
            
            // In a real implementation, this would call an API
            // For demo purposes, we'll just update the local user object
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update user object
            this.currentUser = {
                ...this.currentUser,
                ...profileData
            };
            
            // Save to localStorage
            this.saveUserToLocalStorage();
            
            // Notify listeners
            if (this.options.onAuthStateChanged) {
                this.options.onAuthStateChanged(this.currentUser);
            }
            
            return this.currentUser;
        } catch (error) {
            console.error("Error updating profile:", error);
            throw error;
        }
    }
    
    /**
     * Follow a user
     * @param {string} userId - ID of the user to follow
     * @returns {Promise<boolean>} - Success status
     */
    async followUser(userId) {
        try {
            if (!this.currentUser) {
                throw new Error("User not authenticated");
            }
            
            // In a real implementation, this would call an API
            // For demo purposes, we'll just update the local user object
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Check if already following
            if (this.currentUser.following.includes(userId)) {
                return true;
            }
            
            // Update following list
            this.currentUser.following.push(userId);
            
            // Save to localStorage
            this.saveUserToLocalStorage();
            
            return true;
        } catch (error) {
            console.error("Error following user:", error);
            throw error;
        }
    }
    
    /**
     * Unfollow a user
     * @param {string} userId - ID of the user to unfollow
     * @returns {Promise<boolean>} - Success status
     */
    async unfollowUser(userId) {
        try {
            if (!this.currentUser) {
                throw new Error("User not authenticated");
            }
            
            // In a real implementation, this would call an API
            // For demo purposes, we'll just update the local user object
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update following list
            this.currentUser.following = this.currentUser.following.filter(id => id !== userId);
            
            // Save to localStorage
            this.saveUserToLocalStorage();
            
            return true;
        } catch (error) {
            console.error("Error unfollowing user:", error);
            throw error;
        }
    }
    
    /**
     * Get user profile by ID
     * @param {string} userId - User ID
     * @returns {Promise<Object>} - User profile
     */
    async getUserProfile(userId) {
        try {
            // In a real implementation, this would call an API
            // For demo purposes, we'll simulate a user profile
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Generate a fake user profile
            return {
                id: userId,
                displayName: "User " + userId.substring(userId.length - 5),
                photoURL: `https://ui-avatars.com/api/?name=User+${userId.substring(userId.length - 5)}&background=random`,
                bio: "ReverseScript enthusiast",
                followers: Math.floor(Math.random() * 100),
                following: Math.floor(Math.random() * 50),
                projects: Math.floor(Math.random() * 10),
                joinedAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
            };
        } catch (error) {
            console.error("Error getting user profile:", error);
            throw error;
        }
    }
}

// Example usage:
/*
const auth = new ReverseScriptAuth({
    onAuthStateChanged: (user) => {
        console.log("Auth state changed:", user);
    }
});

// Sign in with email and password
auth.signInWithEmailPassword("user@example.com", "password")
    .then(user => console.log("Signed in:", user))
    .catch(error => console.error("Sign in error:", error));

// Sign in with Google
auth.signInWithGoogle()
    .then(user => console.log("Signed in with Google:", user))
    .catch(error => console.error("Google sign in error:", error));

// Sign in with Discord
auth.signInWithDiscord()
    .then(user => console.log("Signed in with Discord:", user))
    .catch(error => console.error("Discord sign in error:", error));

// Sign out
auth.signOut()
    .then(() => console.log("Signed out"))
    .catch(error => console.error("Sign out error:", error));
*/
