export const BASE_URL = "https://crm-backend-tiix.vercel.app";
// export const BASE_URL = "http://localhost:4000";

// export const BASE_URL = "http://127.0.0.1:4000";

// ======================= GET =============================================================================
//? Get all students
export const getStudents = async (filters, pageNo) => {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters || {}),
  };
  const response = await fetch(`${BASE_URL}/student/list?p=${pageNo}`, options);
  const data = await response.json();
  return data;
};

//? Get student by id
export const getStudentById = async (id) => {
  const response = await fetch(`${BASE_URL}/student/single/?id=${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  return data;
};

//? Get Misc Data
export const getMiscData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/student/misc`);
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const getAppointments = async (filter) => {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `${BASE_URL}/student/getappointment?filter=${filter}`, // Update the URL here
      options
    );
    const data = await response.json();

    if (data.error) {
      throw data.error;
    }
    return data;
  } catch (error) {
    throw error;
  }
};

//? Get Reviews List
export const getReviews = async () => {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(`${BASE_URL}/site/list-reviews`, options);
    const data = await response.json();

    if (data.error) {
      throw data.error;
    }
    return data;
  } catch (err) {
    throw err;
  }
};

// Getting search results
export const searchResult = async (query) => {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/student/search?firstName=${query}`,
      options
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw error;
  }
};

//? Get Misc Reviews information
export const getMiscReviews = async () => {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(`${BASE_URL}/site/misc`, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 404) {
      throw new Error("No reviews found");
    } else {
      throw new Error("Error retrieving review data");
    }
  } catch (err) {
    throw err;
  }
};

// ======================= POST =============================================================================
//? Create Student through Form
export const sendForm = async (data) => {
  // console.log(data);
  const formData = {
    firstName: data.firstName,
    lastName: data.lastName,
    dob: data.dob,
    gender: data.gender,
    schoolName: data.schoolName,
    schoolYear: data.schoolYear,
    addressDetail: {
      addressStreet: data.addressStreet,
      suburb: data.suburb,
      postCode: data.postCode,
      parentsEmail: data.parentsEmail,
    },
    parentDetail: [
      {
        name: data.parentName,
        relation: data.relation,
        phone: data.parentPhone,
      },
    ],
    healthDetail: {
      allergicFood: data.allergicFood,
      medications: data.medications,
      allergicMedication: data.allergicMedication,
      healthProblem: data.healthProblem,
    },
    tutoringDetail: {
      subjects: data.subjects,
      frequency: 2,
      days: data.days,
      paymentMethod: data.paymentMethod,
    },
    status: "Pending",
    approved: false,
  };

  try {
    const response = await fetch(`${BASE_URL}/student/save`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error.message;
  }
};

export const sendFormByAdmin = async (data) => {
  const formData = {
    firstName: data.firstName,
    lastName: data.lastName,
    dob: data.dob,
    gender: data.gender,
    schoolName: data.schoolName,
    schoolYear: data.schoolYear,
    addressDetail: {
      addressStreet: data.addressStreet,
      suburb: data.suburb,
      postCode: data.postCode,
      parentsEmail: data.parentsEmail,
    },
    parentDetail: [
      {
        name: data.parentName,
        relation: data.relation,
        phone: data.parentPhone,
      },
    ],
    healthDetail: {
      allergicFood: data.allergicFood,
      medications: data.medications,
      allergicMedication: data.allergicMedication,
      healthProblem: data.healthProblem,
    },
    tutoringDetail: {
      subjects: data.subjects,
      frequency: 2,
      days: [],
      paymentMethod: data.paymentMethod,
      timeSlots: data.timeSlots,
    },
    status: "Active",
    approved: true,
  };
  try {
    const response = await fetch(`${BASE_URL}/admin/save`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error.message;
  }
};

//? Send email
export const sendEmail = async (data) => {
  const mailData = {
    emails: data.to,
    subject: data.subject,
    body: data.body,
  };

  const response = await fetch(`${BASE_URL}/student/sendemails`, {
    method: "POST",
    body: JSON.stringify(mailData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const responseData = await response.json();
  return responseData;
};

//? Add Comment
export const addComment = async (id, text) => {
  try {
    const response = await fetch(`${BASE_URL}/student/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    throw error;
  }
};

//? Add Appointment
export const addAppointment = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/student/saveappointment`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.error || "Failed to add appointment");
    }
  } catch (error) {
    throw error;
  }
};

// ======================= PUT =============================================================================

export const updateStudent = async (studentId, data) => {
  try {
    const response = await fetch(`${BASE_URL}/student/${studentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update student");
    }

    const responseData = await response.json();
    return responseData.message; // Handle the response as needed
  } catch (error) {
    throw error; // Handle the error
  }
};

// ======================= DELETE =============================================================================
//? Removing the particular comment
export const removeComment = async (id, commentId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/student/${id}/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      return responseData.message;
    } else {
      throw new Error("Failed to update comment status");
    }
  } catch (error) {
    throw error;
  }
};

export const deleteAppointment = async (appointmentId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/student/appointment/${appointmentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error("Failed to delete appointment");
    }
  } catch (error) {
    throw error;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await fetch(`${BASE_URL}/site/delete-review/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    throw error;
  }
};
