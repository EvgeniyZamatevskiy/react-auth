export const getCurrentTime = (time) => {
	const leftSideTime = `0${time === 60 ? 1 : 0}`
	const rightSideTime = `${time === 60 ? '00' : time < 10 ? `0${time}` : time}`

	return `${leftSideTime}:${rightSideTime}`
}
