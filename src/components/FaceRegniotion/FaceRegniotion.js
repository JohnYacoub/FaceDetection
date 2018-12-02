import React from 'react';
import './FaceRegniotion.css'

const FaceRegniotion = ({imgUrl, box}) => {
	return (
	<div className='center ma'>
		<div className = 'absolute mt2'>
		<img id='image' alt='' src={imgUrl} width='500px' heigh='auto' />
		<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
		</div>
	</div>
	);
}

export default FaceRegniotion;