import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsArrowRightShort } from 'react-icons/bs';
import { IoHomeSharp } from 'react-icons/io5';
import ProgressBar from "../../../componets/progressBar/ProgressBar";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../../firebase";
import { collection, getFirestore, getDocs } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {Container, Icons, Title, ProgressTable, Progress, UnitProgress, UnitName, ProgressIcon,TotalProgress,UnitContainer,Units,Unit,Part,Parts} from "../../courses/drawers/intro";

import { TailSpin } from  'react-loader-spinner'

const authInstance = getAuth();
const db = getFirestore();
const ref = collection(db, 'kurslar');

function Intro() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const [data, isLoading] = useCollectionData(ref);

    if (isLoading) {
        return <TailSpin
        height="80"
        width="80"
        color="var(--main-color)"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />;
    }

    const idToFind = '001'; // Aranan belgenin ID'si
    const foundDocument = data.find(doc => doc.id === idToFind);

    if (foundDocument) {
        console.log(foundDocument.name);
    } else {
        console.log('Belge bulunamadı.');
    }
  return (
    <Container>
        <Icons><IoHomeSharp style={{color: "var(--main-color)"}}/><BsArrowRightShort style={{color: "var(--main-color)"}}/><p> 9. Sınıf</p></Icons>
        {/* <Title><h1> {aItem.name} </h1></Title> */}
        {isLoggedIn && (
        <ProgressTable>
            <p style={{marginLeft:"1.5rem"}}>Ünitedeki ilerlemeni göstermektedir. Bölümleri tamamlayıp,soru çözdükçe ilerlemen artacaktır. </p>
            <Progress>
                <UnitProgress>
                <UnitName>Konu 1  </UnitName>
                    <ProgressIcon><ProgressBar/></ProgressIcon>
                </UnitProgress>
                <UnitProgress>
                    <UnitName>Konu 2</UnitName>
                    <ProgressIcon><ProgressBar/></ProgressIcon>
                </UnitProgress>
                <UnitProgress>
                    <UnitName>Konu 3</UnitName>
                    <ProgressIcon><ProgressBar/></ProgressIcon>
                </UnitProgress>
                <UnitProgress>
                    <UnitName>Konu 4</UnitName>
                    <ProgressIcon><ProgressBar/></ProgressIcon>
                </UnitProgress>
                <UnitProgress>
                    <UnitName>Konu 5</UnitName>
                    <ProgressIcon><ProgressBar/></ProgressIcon>
                </UnitProgress>
                
            </Progress>
            <TotalProgress><p style={{marginLeft:"1.5rem"}}>Toplam İlerleme</p> <BsArrowRightShort style={{color: "var(--main-color)"}}/> <ProgressBar/></TotalProgress>
        </ProgressTable>
        )}
        <Title><h2>9. Sınıf Üniteleri</h2></Title>
        
            <UnitContainer>
                <Units>
                    <Unit>Ünite 1 : Mantık</Unit>
                    <Parts>
                        <Part>Önerme </Part>
                        <Part>Doğruluk değeri</Part>
                        <Part>Önerme </Part>
                        <Part>Doğruluk değeri</Part>
                        <Part>Önerme </Part>
                        <Part>Doğruluk değeri</Part>
                    </Parts>
                </Units>
                <Units>
                    <Unit>Ünite 2 : Kümeler</Unit>
                    <Parts>
                        <Part>Önerme </Part>
                        <Part>Doğruluk değeri</Part>
                        <Part>Önerme </Part>
                        <Part>Doğruluk değeri</Part>
                        <Part>Önerme </Part>
                        <Part>Doğruluk değeri</Part>
                    </Parts>
                </Units>
                <Units>
                    <Unit>Konu 1: Önerme nedir?</Unit>
                    <Parts>
                        <Part>Önerme </Part>
                        <Part>Doğruluk değeri</Part>
                        <Part>Önerme </Part>
                        <Part>Doğruluk değeri</Part>
                    </Parts>
                </Units>
                <Units>
                    <Unit>Konu 1: Önerme nedir?</Unit>
                    <Parts>
                        <Part>Önerme </Part>
                        <Part>Doğruluk değeri</Part>
                    </Parts>
                </Units>
                
            </UnitContainer>
            
        
    </Container>
  )
}

export default Intro
