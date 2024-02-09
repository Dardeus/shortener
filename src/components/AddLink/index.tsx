import React, {useState} from "react";
import styles from "./AddLink.module.scss"
import axios from "axios";
import add from '../../assets/images/add.svg'

type LinkProps = {
  access_token: string
}

const AddLink:React.FC<LinkProps> = ({access_token}) => {
  const [link, setLink] = useState('')
  const onClickSqueeze = async () => {
    try {
      await axios.post(
        `https://front-test.hex.team/api/squeeze?link=${link}`,
        '',
        {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        }
      )
    } catch (e: any) {
      console.log(e)
    }
  }

  return (
    <div className={styles.root}>
      <input value={link}
             onChange={(e) => setLink(e.target.value)}
             className={styles.input}
             placeholder='Введите ссылку для сокращения'
      />
      <img onClick={onClickSqueeze} className={styles.add} src={add} alt='add'/>
    </div>)
}

export default AddLink