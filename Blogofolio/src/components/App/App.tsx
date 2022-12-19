import React, {useEffect} from 'react';

import MainWrapper from "../common/MainWrapper/MainWrapper";
import AppRouter from "../AppRouter/AppRouter";
import ModalWindow from "../common/ModalWindow/ModalWindow";
import ModalWindowImg from "../common/ModalWindow/ModalWindowImg";

import {useSelector} from "react-redux";

function App() {

    const { selectedCard } = useSelector((state: any) => state.selectedCard);
    const { selectedImg } = useSelector((state: any) => state.selectedCard);

    // Если открыто модальное окно, то убираем скролл у всего документа
    useEffect(()=> {
        if (selectedCard?.id || selectedImg?.image) {
            document.body.style.overflow = "hidden"
        }
        else {
            document.body.style.overflow = "unset"
        }
    }, [selectedCard?.id, selectedImg?.image])

    return (
      <MainWrapper>
            <AppRouter/>
          {!!selectedCard?.id && <ModalWindow/>}
          {!!selectedImg?.image && <ModalWindowImg/>}
      </MainWrapper>
  );
}

export default App;
