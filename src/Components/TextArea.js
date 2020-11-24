import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import Reducer from '../Reducer'
import { INITSTATE, TRANSLATE_TEXT, RU, RU_LANG, ENG, ENG_LANG } from '../Utils/Constants'
import SwapImage from '../Images/swap.png'

function TextArea() {
  const [text, setText] = useState()
  const [state, dispatch] = useReducer(Reducer, INITSTATE)
  // useEffect( () =>{
  //   axios.get('/product')
  //     .then(res => setTimeout(() => {
  //       const data = res.data
  //       dispatch({
  //         type: FETCH_DATA,
  //         payload: data,
  //       })
  //     }, 2000))
  // },[state])

  function changeLanguage() {
    var firstAttr = document.getElementById("firstText").innerHTML
    var secondText = document.getElementById("secondText").innerHTML
    let temp = secondText
    document.getElementById("firstText").innerText = temp
    document.getElementById("secondText").innerHTML = firstAttr
  }

  async function testChanges(value) {
    var firstAttr = document.getElementById("firstText").innerHTML
    var secondText = document.getElementById("secondText").innerHTML
    const word = {
      "text": value,
      "sourceLang": firstAttr === RU_LANG ? RU : ENG,
      "translatedLang": secondText === ENG_LANG ? ENG : RU,
    }
    axios.post('/savedb', word)
      .then(res => {
        dispatch({
          type: TRANSLATE_TEXT,
          payload: res.data,
          text: value
        })
      })
  }

  return (
    <div className="jumbotron shadow p-3 mb-5 bg-white rounded">
      <ul className="nav justify-content-center mr-6">
        <li className="nav-item">
          <a className="btn btn-primary btn-lg disabled" href="#" id="firstText">ENG</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#" onClick={() => changeLanguage()}>
            <img src={SwapImage} width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy" />
          </a>
        </li>
        <li className="nav-item">
          <a className="btn btn-primary btn-lg disabled" width="200px" href="#" tabindex="-1" id="secondText" aria-disabled="true">RUS</a>
        </li>
      </ul>
      <hr></hr>
      <form>
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <textarea className="form-control" onChange={e => testChanges(e.target.value)} id="exampleFormControlTextarea1" rows="5" placeholder="Введите текст"></textarea>
          </div>
          <div className="col-md-6 mb-3">
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" value={state.translatedData} disabled placeholder="Перевод"></textarea>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Сохранить</button>
      </form>
    </div>

  )
}

export default TextArea