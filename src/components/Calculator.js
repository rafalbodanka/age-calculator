import React, { useState } from "react";
import { animated, useSpring} from '@react-spring/web'

import iconArrow from '../assets/images/icon-arrow.svg';

const Calculator = () => {
    const [age, setAge] = useState({
        years: null,
        months: null,
        days: null,
    })

    const [birth, setBirth] = useState({
        year: null,
        month: null,
        day: null,
    })
		
		const [invalidDay, setInvalidDay] = useState(false)
		const [invalidMonth, setInvalidMonth] = useState(false)
		const [invalidYear, setInvalidYear] = useState(false)
		const [invalidDate, setInvalidDate] = useState(false)

		const openInvalidDateModal = () => {
			setInvalidDate(true);
		}

		const closeInvalidDateModal = () => {
			setInvalidDate(false);
		}

    const handleChange = (event) => {
				const currentDate = new Date()
        const { name, value } = event.target;
        if (name === 'year') {
            if (value > currentDate.getFullYear() || value < 0) {
                setInvalidYear(true)
            } else {
							setInvalidYear(false)
						}
        }
				if (name === 'day') {
					if (value === "") {
						setInvalidDay(false);
					} else if (value.length > 1 && (value < 1 || value > 31)) {
						setInvalidDay(true);
					} else {
						setInvalidDay(false);
					}
				}
				if (name === 'month') {
					if (value === "") {
						setInvalidMonth(false);
					} else if (value.length > 1 && (value < 1 || value > 12)) {
						setInvalidMonth(true);
					} else {
						setInvalidMonth(false);
					}
				}

        setBirth((prevBirth) => ({
          ...prevBirth,
          [name]: value,
        }));

				setAge({
					years: null,
					months: null,
					days: null,
				})
      };

	const CalculateAge = () => {
		const { day, month, year } = birth;
	
		// if any input errors, early return
		if (invalidDay || invalidMonth || invalidYear) {
			return;
		}
	
		const birthDate = new Date(`${month}/${day}/${year}`)
		const currentDate = new Date()
		const currentDay = currentDate.getDate()
		const currentMonth = currentDate.getMonth() + 1;
		const currentYear = currentDate.getFullYear()

		const todayDate = new Date(`${currentMonth}/${currentDay}/${currentYear}`)
		
		const timeDiff = Math.abs(todayDate.getTime() - birthDate.getTime());

		if (todayDate < birthDate) {
			openInvalidDateModal();
			return;
		}

		const daysPassed = Math.ceil(timeDiff / (1000 * 3600 * 24));


		const yearsPassed = Math.floor(daysPassed / 365);
		const monthsPassed = Math.floor((daysPassed % 365) / 30);
		const remainingDays = Math.floor((daysPassed % 365) % 30);

		setAge({ years: yearsPassed, months: monthsPassed, days: remainingDays });
	};

	const AnimatedNumber = ({ n }) => {
		const { number } = useSpring({
			from: { number: 0},
			number: n,
			delay: 200,
			config: { mass: 1, tension: 20, friction: 10},
		})

		return <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>
	};

    return (
        <div className="bg-white md:w-1/2 md:h-3/4 w-11/12 h-auto rounded-3xl md:rounded-br-5xl rounded-br-4xl">
            <div className="md:m-12 m-8">
                <form className="xl:mr-48 mb-8">
                    <div className="grid grid-cols-3 text-smokeGrey md:gap-8 gap-4">
                        <div className="">
							<div className="">DAY</div>
							<input className="form_input" type="text" name="day" value={birth.day || ''} onChange={handleChange} placeholder="DD" />
							{invalidDay && <div className="absolute text-lightRed">Invalid day</div>}
						</div>
                        <div className="">
							<div className="">MONTH</div>
							<input className="form_input" type="text" name="month" value={birth.month || ''} onChange={handleChange} placeholder="MM" />
							{invalidMonth && <div className="absolute text-lightRed">Invalid month</div>}
						</div>
                        <div className="">
							<div className="">YEAR</div>
							<input className="form_input" type="text" name="year" value={birth.year || ''} onChange={handleChange} placeholder="YYYY" />
							{invalidYear && <div className="absolute text-lightRed">Invalid year</div>}
						</div>
                    </div>
                </form>
                <div className="flex justify-center">
                        <hr className="flex-grow h-1/4 mt-10 mb-10 md:mb-0 bg-lightGrey"></hr>
                        <button type="submit" onClick={CalculateAge} className="absolute md:relative"><img src={iconArrow} className="bg-purple p-4 rounded-full hover:bg-offBlack" alt="Icon Arrow"></img></button>
                </div>
                <div className="lg:text-8xl text-4xl md:text-6xl mt-8 italic font-800">
                    <p className="mb-8">
                        <span className="text-purple">{age.years ?
												<AnimatedNumber n={age.years}></AnimatedNumber> : "--"}</span> years
                    </p>
                    <p className="mb-8">
										<span className="text-purple">{age.months ?
												<AnimatedNumber n={age.months}></AnimatedNumber> : "--"}</span> months
                    </p>
                    <p className="mb-8">
										<span className="text-purple">{age.days ?
												<AnimatedNumber n={age.days}></AnimatedNumber> : "--"}</span> days
                    </p>
                </div>
            </div>
						{invalidDate && (
            <div onClick={closeInvalidDateModal} className="w-screen h-screen bg-black bg-opacity-40 fixed top-0 left-0 flex justify-center items-center">
							<div className="bg-white p-6 rounded-md text-xl">
								<p>Please set correct birth date.</p>
								<p className="text-center mt-4">
								<button onClick={closeInvalidDateModal} className="bg-purple text-offWhite p-1 pl-2 pr-2 rounded-md">Close</button>
								</p>
							</div>
						</div>
							)}
        </div>
    )
}

export default Calculator