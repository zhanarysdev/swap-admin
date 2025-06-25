// Simple test for schedule validation
function validateTimes(schedule) {
    const errors = {};

    schedule.forEach(item => {
        if (item.open_time && item.close_time && item.open_time === item.close_time) {
            errors[item.week_day] = "Время открытия и закрытия не могут быть одинаковыми";
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// Test cases
const testCases = [
    {
        name: "Valid schedule - different times",
        schedule: [
            { week_day: "monday", open_time: "09:00", close_time: "18:00" },
            { week_day: "tuesday", open_time: "10:00", close_time: "19:00" }
        ],
        expectedValid: true
    },
    {
        name: "Invalid schedule - equal times",
        schedule: [
            { week_day: "monday", open_time: "09:00", close_time: "09:00" },
            { week_day: "tuesday", open_time: "10:00", close_time: "19:00" }
        ],
        expectedValid: false
    },
    {
        name: "Invalid schedule - multiple equal times",
        schedule: [
            { week_day: "monday", open_time: "09:00", close_time: "09:00" },
            { week_day: "tuesday", open_time: "10:00", close_time: "10:00" }
        ],
        expectedValid: false
    }
];

// Run tests
testCases.forEach(testCase => {
    const result = validateTimes(testCase.schedule);
    const passed = result.isValid === testCase.expectedValid;

    console.log(`Test: ${testCase.name}`);
    console.log(`Expected valid: ${testCase.expectedValid}, Got valid: ${result.isValid}`);
    console.log(`Errors:`, result.errors);
    console.log(`Result: ${passed ? 'PASS' : 'FAIL'}`);
    console.log('---');
});

console.log('Validation test completed!'); 