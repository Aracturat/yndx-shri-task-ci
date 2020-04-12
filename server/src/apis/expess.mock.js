const mockRequest = ({ query = {}, params = {} } = {}) => {
	return {
		query: query,
		params: params}
	;
};

const mockResponse = () => {
	const response = {
		status: jest.fn(),
		send: jest.fn()
	};

	response.status.mockReturnValue(response);
	response.send.mockReturnValue(response);

	return response;
};

module.exports = {
	mockRequest,
	mockResponse
};

