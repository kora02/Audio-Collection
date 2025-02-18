// data.js
function createData(name, wordCount, date, genre, description, users, status) {
    return {
        name,
        wordCount,
        date,
        genre,
        description,
        users,
        status
    };
}

const AllProjects = [
    createData(
        'Project A',
        1590,
        '2024-05-21',
        'Science Fiction',
        'This is a description of Project A.',
        [
            { name: 'User 1', dateJoined: '2024-01-10' },
            { name: 'User 2', dateJoined: '2024-02-15' },
        ],
        'Urađen'
    ),
    createData(
        'Project B',
        2370,
        '2023-11-13',
        'Fantasy',
        'This is a description of Project B.',
        [
            { name: 'User 3', dateJoined: '2023-03-20' },
            { name: 'User 4', dateJoined: '2023-07-25' },
        ],
        'Aktivan'
    ),
    createData(
        'Project C',
        1800,
        '2024-09-15',
        'Mystery',
        'This is a description of Project C.',
        [
            { name: 'User 5', dateJoined: '2024-06-10' },
            { name: 'User 6', dateJoined: '2024-08-20' },
        ],
        'Neaktivan'
    ),
    createData(
        'Project D',
        3000,
        '2022-07-05',
        'Adventure',
        'This is a description of Project D.',
        [
            { name: 'User 7', dateJoined: '2022-04-01' },
            { name: 'User 8', dateJoined: '2022-06-15' },
        ],
        'Urađen'
    ),
    createData(
        'Project E',
        2500,
        '2024-03-21',
        'Horror',
        'This is a description of Project E.',
        [
            { name: 'User 9', dateJoined: '2024-02-20' },
            { name: 'User 10', dateJoined: '2024-02-25' },
        ],
        'Aktivan'
    ),
    createData(
        'Project F',
        2100,
        '2024-04-10',
        'Romance',
        'This is a description of Project F.',
        [
            { name: 'User 11', dateJoined: '2024-03-05' },
            { name: 'User 12', dateJoined: '2024-03-10' },
        ],
        'Aktivan'
    ),
    createData(
        'Project G',
        1950,
        '2024-01-15',
        'Thriller',
        'This is a description of Project G.',
        [
            { name: 'User 13', dateJoined: '2023-12-01' },
            { name: 'User 14', dateJoined: '2023-12-10' },
        ],
        'Neaktivan'
    ),
    createData(
        'Project H',
        3200,
        '2023-08-05',
        'Drama',
        'This is a description of Project H.',
        [
            { name: 'User 15', dateJoined: '2023-07-01' },
            { name: 'User 16', dateJoined: '2023-07-15' },
        ],
        'Urađen'
    ),

];


const ActiveProjects = AllProjects.filter(project => project.status === 'Aktivan');
const InactiveProjects = AllProjects.filter(project => project.status === 'Neaktivan');
const CompletedProjects = AllProjects.filter(project => project.status === 'Urađen');

export { AllProjects, ActiveProjects, InactiveProjects , CompletedProjects };