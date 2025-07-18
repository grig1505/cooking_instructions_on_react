import styles from './app.module.css';
import { useEffect, useState } from 'react';
import data from './data.json';

export const App = () => {
	const [steps, setSteps] = useState([]);
	const [activeIndex, setActiveIndex] = useState(1);
	const [isFirstStep, setIsFirstStep] = useState(true);
	const [isLastStep, setIsLastStep] = useState(false);

	useEffect(() => {
		setSteps(data);
		if (activeIndex +1 === 1) {
			setIsFirstStep(true);
			setIsLastStep(false);
		} else if (activeIndex === steps.length - 1) {
			setIsFirstStep(false);
			setIsLastStep(true);
		} else {
			setIsFirstStep(false);
			setIsLastStep(false);
		}
	}, [activeIndex]);

	useEffect(() => {
		setActiveIndex(0);
	}, []);

	function handleClick(index) {
		setActiveIndex(index);
	}

	function handleClickNext() {
		setActiveIndex(activeIndex + 1);
	}
	function handleClickBackOnOneStep() {
		setActiveIndex(0);
	}
	function handleClickBack() {
		setActiveIndex(activeIndex - 1);
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция ...</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps.map((item, index) => (
						<div key={index}>
						{Number(index) === Number(activeIndex) ? item.content : null}
						</div>
						))}
					</div>
					<ul className={styles['steps-list']}>
					{steps.map((item, index) => {
					const isActive = index === activeIndex;
					const isDone = index < activeIndex;
					return (
					<li
						key={index}
						className={`${styles['steps-item']} ${isDone ? styles.done : ''} ${isActive ? styles.active : ''}`}
					>
						<button onClick={() => handleClick(index)} className={styles['steps-item-button']}>
							{Number(item.id)}
						</button>
						Шаг {Number(item.id)}
					</li>
					);
					})}
					</ul>
					{/* {activeIndex + 1} */}
					<div className={styles['buttons-container']}>
						<button
						onClick={handleClickBack}
						className={styles.button}
						disabled={isFirstStep}>Назад</button>
						<button
						onClick={handleClickNext}
						className={styles.button}
						disabled={isLastStep}
						style={{ display: isLastStep ? 'none' : 'inline-block' }}
					>
						Далее
					</button>
					<button
						onClick={handleClickBackOnOneStep}
						className={styles.button}
						disabled={isFirstStep}
						style={{ display: isLastStep ? 'inline-block' : 'none' }}
					>
						Начать сначала
					</button>
					</div>

				</div>
			</div>
		</div>
	);
};
