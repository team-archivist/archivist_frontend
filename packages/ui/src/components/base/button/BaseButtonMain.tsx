import { Button } from '@radix-ui/themes';


/**
 * - Main Button Component 입니다
 */
export const BaseButtonMain = ( { children , onClick } ) => {
    return (
        <Button size={"4"} variant="solid"
                style={ { backgroundColor : `#222222` , cursor: 'pointer' } }
                onClick={ onClick }>
            { children }
        </Button>
    )
}