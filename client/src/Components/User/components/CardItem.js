

import React from "react";
import {Link} from "react-router-dom";

function CardItem(props) {
    return (
        <>
          <li className="cards__item">
            <Link className="cards__item__link" to={props.path}>
                <figure className="cards__item__pic-wrap" data-category={props.label}>
                </figure>
                <div className="cards__item__info">
                    <h5 className="cards__item__text">
                        {props.text}
                    </h5>
                    <div className="cards__item__label2" data-category={props.label2}>
            {`Word Count: ${props.label2}`}
          </div>
                </div>
            </Link>
          </li>
        </>
    )
}

export default CardItem;