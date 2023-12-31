import { forwardRef } from 'react';

// types
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

// ==============================|| CUSTOM SUB CARD ||============================== //

const SubCard = forwardRef(({ children, content, contentClass, darkTitle, secondary, sx = {}, contentSX = {}, title, ...others }, ref) => {
    const theme = useTheme();

    return (
        <Card
            ref={ref}
            sx={{
                ':hover': {
                    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
                },
                ...sx
            }}
            {...others}
        >
            {/* card content */}
            {content && (
                <CardContent sx={{...contentSX}} className={contentClass || ''}>
                    {children}
                </CardContent>
            )}
            {!content && children}
            {/* card header and action */}
            {!darkTitle && title && <CardHeader title={<Typography >{title}</Typography>} action={secondary} />}
            {darkTitle && title && <CardHeader title={<Typography >{title}</Typography>} action={secondary} />}

        </Card>
    );
});


SubCard.defaultProps = {
    content: true
};

export default SubCard;