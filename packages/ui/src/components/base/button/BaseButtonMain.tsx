import { Button } from '@radix-ui/themes';


/**
 * - Main Button Component 입니다
 */
export const BaseButtonMain = ( { children , onClick } ) => {
    return (
        <Button size={"2"} variant="solid"
                radius="full"
                style={ { backgroundColor : `#FF6625` , cursor: 'pointer' } }
                onClick={ onClick }>
            { children }
        </Button>
    )
}