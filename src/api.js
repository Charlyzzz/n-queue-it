export const getCurrentClassroomState = () => {
    return fetch('http://localhost:8080/aula/iasc')
        .then(response => response.json());
};

const interestedRequest = (httpMethod, participantName) => {
    fetch('http://localhost:8080/aula/iasc/interesados', {
        method: httpMethod,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({nombre: participantName}),
    })
};
export const sendAddParticipantRequest = (participantName) => interestedRequest('POST', participantName);
export const sendRemoveParticipantRequest = (participantName) => interestedRequest('DELETE', participantName);