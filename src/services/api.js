import axios from "axios";

class ApiServices {
  token = null;

  setToken(token) {
    this.token = token;
  }

  async signin(loginData) {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/signin`,
      loginData
    );
    return data;
  }

  async signUp(registerData) {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/signup`,
      registerData
    );
    return data;
  }

  async getPosts() {
    if (!this.token) throw new Error("Token not set! Call setToken first.");
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async getPostDetails(postId) {
    if (!this.token) throw new Error("Token not set!");
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async getLoggedUserData() {
    if (!this.token) throw new Error("Token not set!");
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile-data`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data;
  }

  async getPostComments(postId) {
    if (!this.token) throw new Error("Token not set!");
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments`,
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
    return data;
  }
 async createPost(postData) {
    if (!this.token) throw new Error("Token not set!");
    const formData = new FormData();
    formData.append("body", postData.body);
    if (postData.image) formData.append("image", postData.image);

    return await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, formData, {
      headers: { 
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "multipart/form-data"
      }
    });
  }


  async createComment(postId, commentData) {
    if (!this.token) throw new Error("Token not set!");
    return await axios.post(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments`, commentData, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }

  async updatePost(postId, postData) {
    if (!this.token) throw new Error("Token not set!");
    const formData = new FormData();
    formData.append("body", postData.body);
    if (postData.image) formData.append("image", postData.image);

    return await axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`, formData, {
      headers: { 
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "multipart/form-data"
      }
    });
  }

   async deletePost(postId) {
    if (!this.token) throw new Error("Token not set!");
    return await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }
    async updateComment(postId, commentId, commentData) {
    if (!this.token) throw new Error("Token not set!");
    const formData = new FormData();
    formData.append("content", commentData.content);
    if (commentData.image) formData.append("image", commentData.image);

    return await axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments/${commentId}`, formData, {
      headers: { 
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "multipart/form-data"
      }
    });
  }

    async deleteComment(postId, commentId) {
    if (!this.token) throw new Error("Token not set!");
    return await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }
    async getProfile() {
    if (!this.token) throw new Error("Token not set!");
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile-data`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    return data;
  }

}


export const apiServices = new ApiServices();

