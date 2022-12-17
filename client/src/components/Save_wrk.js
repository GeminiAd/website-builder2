import React from "react";
import { saveContent } from '../utils/api';
import Auth from "../utils/auth";

const save = ({ myProp, cards, dustbinDimensions }) => {
    const saveCont = async (e) => {
        e.preventDefault();
        let title = prompt('what would you like to title your project')
        let desc = prompt('describe your project')
        let cardsObj = {
            contentTitle: 'cards',
            cardsArr: cards,
            dimenstions: dustbinDimensions
        }
        // myProp.push(cardsObj)
        let content = []

        myProp.forEach((prop)=>{
            content.push(prop);
        })

        content.push(cardsObj);
        let userData = {
            buildCode: content,
            title: title,
            description: desc
        }
        try {
            const token = Auth.loggedIn() ? Auth.getToken() : null;
            if (!token) {
                return false;
            }
            userData.userId = Auth.getUserId();
            const response = await saveContent(userData);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

        } catch (err) {
            console.error(err);
        }

    }
    return (
        <button onClick={saveCont}>
            Save Build
        </button>
    )
}
export default save;