// Regex
const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
const phoneRegex = new RegExp(/^\d{10}$/g);
const alphaOnlyRegex = new RegExp(/^[A-Za-z]+$/);

// Methods
function filterNonNumericSupervisors(supervisors) {
  return supervisors.filter((supervisor) => isNaN(supervisor.jurisdiction));
}

function sortBy(list, key) {
  return list.sort((a, b) => {
    if (a[key].toLowerCase() < b[key].toLowerCase()) {
      return -1;
    }
    if (a[key].toLowerCase() > b[key].toLowerCase()) {
      return 1;
    }
    return 0;
  });
}

function sortSupervisors(supervisors) {
  const sortByFirstName = sortBy(supervisors, "firstName");
  const sortByLastName = sortBy(sortByFirstName, "lastName");
  return sortBy(sortByLastName, "jurisdiction");
}

function formatSupervisors(supervisors) {
  return supervisors.map((supervisor) => {
    const {
      id,
      firstName,
      lastName,
      jurisdiction,
      phone,
      identificationNumber,
    } = supervisor;
    return {
      id,
      title: `${jurisdiction} - ${lastName}, ${firstName}`,
      phone,
      identificationNumber,
    };
  });
}

const checkIfExist = (obj, key) =>
  !(key in obj) || (key in obj && !obj[key].trim());

function validatePayload(bodyData) {
  if (checkIfExist(bodyData, "firstName")) {
    return { isValid: false, message: "First Name is required!" };
  } else if (!alphaOnlyRegex.test(bodyData.firstName.trim())) {
    return {
      isValid: false,
      message: "First Name must only contain alphabets!",
    };
  }
  if (checkIfExist(bodyData, "lastName")) {
    return { isValid: false, message: "Last Name is required!" };
  } else if (!alphaOnlyRegex.test(bodyData.lastName.trim())) {
    return {
      isValid: false,
      message: "Last Name must only contain alphabets!",
    };
  }
  if (checkIfExist(bodyData, "supervisor")) {
    return { isValid: false, message: "Supervisor is required!" };
  }
  if (bodyData?.email && !emailRegex.test(bodyData.email.trim())) {
    return { isValid: false, message: "Invalid Email!" };
  }
  if (bodyData?.phoneNumber && !phoneRegex.test(bodyData.phoneNumber.trim())) {
    return {
      isValid: false,
      message: "Invalid Phone Number! Must contain 10 digits without alphabets",
    };
  }

  const { firstName, lastName, supervisor } = bodyData;

  return {
    isValid: true,
    message: "Submit Successful!",
    data: {
      firstName,
      lastName,
      supervisor,
      email: bodyData?.email || "",
      phoneNumber: bodyData?.phoneNumber || "",
    },
  };
}

module.exports = {
  filterNonNumericSupervisors,
  sortSupervisors,
  formatSupervisors,
  validatePayload,
};
