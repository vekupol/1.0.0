import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Desmos from 'desmos';

function FunctionGraph() {
  const desmosContainer = useRef(null);
  const calculatorRef = useRef(null);

  useEffect(() => {
    const elt = document.createElement('div');
    elt.style.width = '265px';
    elt.style.height = '265px';
    elt.style.margin = '0 auto';

    

    desmosContainer.current.innerHTML = ''; // Mevcut içeriği temizle

    const calculator = Desmos.GraphingCalculator(elt, {
      keypad: true,
      expressions: false,
      zoomButtons: false,
      graphpaper: true,
      settingsMenu: false,
      lockViewport: true, //bu sayede zoom taşıma yapılmıyor önemli
      xAxisMinorSubdivisions: 1, // X ekseni alt bölümleri
      yAxisMinorSubdivisions: 1, // Y ekseni alt bölümleri
      xAxisStep: 2, // X ekseni adım
      yAxisStep: 2, // Y ekseni adım
    });
    

    calculator.setExpression({ id: 'graph1', latex: 'y=x' });
    calculator.setExpression({ id: 'graph2', latex: 'y=x^2' });
    calculator.setExpression({ id: 'graph3', latex: 'y=x^3'});
    calculator.setExpression({ id: 'graph3', latex: 'y=\\sin(2x)' });
    
    


    //Noktalar
    calculator.setExpression({
      id: 'pointA',
      latex: 'A=(1,2)',
      pointStyle: Desmos.Styles.CROSS
    });
    // Now point A will render with `CROSS` styling
    calculator.setExpression({
      id: 'pointA',
      dragMode: Desmos.DragModes.NONE
    });

    // Point B will render as a hole
    calculator.setExpression({
      id: 'pointB',
      latex: 'B=(2,4)',
      dragMode: Desmos.DragModes.NONE,
      pointStyle: Desmos.Styles.OPEN
    });

    // This point will render with `CROSS` styling, because the default
    // `dragMode` for an unassigned point with numeric values is `NONE`
    calculator.setExpression({
      id: 'pointC',
      latex: '(7,5)',
      pointStyle: Desmos.Styles.CROSS
    });
    calculator.setExpression({
      id: 'pointD',
      latex: 'D=(-1,-2)',
      pointStyle: Desmos.Styles.DASHED,
      dragMode: Desmos.DragModes.NONE /// bu olmazsa noktalar sürüklenebiliyor
    });
  

    // Mevcut hesaplayıcıyı güncelle
    calculatorRef.current = calculator;
    
    desmosContainer.current.appendChild(elt);

    return () => {
      calculator.destroy();
    };
  }, []);

  return (
    <Container>
      <Graphic ref={desmosContainer} className='formulas'>
        f(x) = 2x+9 grafiği
      </Graphic>     
    </Container>
  );
}

const Container = styled.div`
`

const Graphic = styled.div`
`

export default FunctionGraph;
