const storedName = "";
const storedSchool = "";

export function storeUserSignupInfo(name, school) {
    storedName = name;
    storedSchool = school;
}

export function grabUserSignUpInfo() {
    return storedName, storedSchool
}
