type Course = {
    department: string,
    course_number: string,
    title: string,
    description: string,    
    prerequisites: string,
}

type Concentration = {
    name: string,
    courses: Course[]
    link: string,
}
