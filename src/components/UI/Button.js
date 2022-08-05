import classes from './Button.module.scss'

const Button = ({children, onClick}) => {

    return (
        <button type="button" onClick={onClick} className={classes.button}>
            {children}
        </button>
    )
}

export default Button;