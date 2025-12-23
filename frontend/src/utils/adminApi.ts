import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// ======================
// Helpers
// ======================
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("admin_token");
  }
  return null;
};

const authHeaders = () => {
  const token = getToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};

// ======================
// AUTH
// ======================
export const adminAuth = {
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/admin/login`, {
      email,
      password,
    });
    return response.data;
  },

  getMe: async () => {
    const response = await axios.get(`${API_URL}/admin/me`, {
      headers: authHeaders(),
    });
    return response.data;
  },
};

// ======================
// CVs
// ======================
export const adminCVs = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/admin/cvs`, {
      headers: authHeaders(),
    });
    return response.data;
  },

  upload: async (language: string, file: File) => {
    if (file.type !== "application/pdf") {
      throw new Error("Only PDF files are allowed");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", language);

    const response = await axios.post(`${API_URL}/admin/cvs`, formData, {
      headers: {
        ...authHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  delete: async (language: string) => {
    const response = await axios.delete(`${API_URL}/admin/cvs/${language}`, {
      headers: authHeaders(),
    });
    return response.data;
  },
};

// ======================
// PROJECTS
// ======================
export const adminProjects = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/admin/projects`, {
      headers: authHeaders(),
    });
    return response.data;
  },

  getById: async (id: number | string) => {
    const response = await axios.get(`${API_URL}/admin/projects/${id}`, {
      headers: authHeaders(),
    });
    return response.data;
  },

  create: async (data: any) => {
    const response = await axios.post(
      `${API_URL}/admin/projects`,
      { project: data }, // 👈 importante para Rails
      {
        headers: authHeaders(),
      }
    );
    return response.data;
  },

  update: async (id: number | string, data: any) => {
    const response = await axios.patch(
      `${API_URL}/admin/projects/${id}`,
      { project: data },
      {
        headers: authHeaders(),
      }
    );
    return response.data;
  },

  delete: async (id: number | string) => {
    const response = await axios.delete(`${API_URL}/admin/projects/${id}`, {
      headers: authHeaders(),
    });
    return response.data;
  },
};

// ======================
// LEVELS (placeholder)
// ======================
export const adminLevels = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/admin/levels`, {
      headers: authHeaders(),
    });
    return response.data;
  },
};

// // ======================
// // PROFILE (placeholder)
// // ======================
// export const adminProfile = {
//   get: async () => {
//     const token = getToken();
//     const response = await axios.get(`${API_URL}/profile`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   },

//   update: async (profileData: any, photoFile?: File) => {
//     const token = getToken();
//     const formData = new FormData();

//     formData.append("profile", JSON.stringify(profileData));

//     if (photoFile) {
//       formData.append("photo", photoFile);
//     }

//     const response = await axios.put(`${API_URL}/admin/profile`, formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.data;
//   },
// };
// ======================
// PROFILE
// ======================
export const adminProfile = {
  get: async () => {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: authHeaders(),
    });
    return response.data;
  },

  update: async (profileData: any, photoFile?: File) => {
    const formData = new FormData();

    // 👇 Campos que son JSON (todos los traducibles)
    const jsonFields = [
      "name",
      "subtitle",
      "bio",
      "story",
      "why",
      "personality",
      "values",
      "fun_facts",
      "social_links",
      "main_stack",
      "familiar",
      "recruiter_projects",
      "quick_stats",
    ];

    // Agregar cada campo del profile
    Object.keys(profileData).forEach((key) => {
      if (profileData[key] !== null && profileData[key] !== undefined) {
        // Si es un campo JSON, convertirlo a string
        if (jsonFields.includes(key)) {
          formData.append(`profile[${key}]`, JSON.stringify(profileData[key]));
        } else {
          formData.append(`profile[${key}]`, profileData[key]);
        }
      }
    });

    // Agregar la foto si existe
    if (photoFile) {
      formData.append("profile[photo]", photoFile);
    }

    const response = await axios.put(`${API_URL}/admin/profile`, formData, {
      headers: {
        ...authHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
