import styles from './app.module.css';
import { useEffect, useState } from 'react';
import data from './data.json';

export const App = () => {
	const [steps, setSteps] = useState([]);
	const [activeIndex, setActiveIndex] = useState(1);
    const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;
 	useEffect(() => {
		setSteps(data);
	}, []);

	useEffect(() => {
		setActiveIndex(0);
	}, []);

	function handleClick(index) {
		setActiveIndex(index);
	}

	function handleClickNext() {
		setActiveIndex(activeIndex + 1);
	}
	function resetToStart() {
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
						{index === activeIndex ? item.content : null}
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
						onClick={resetToStart}
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
