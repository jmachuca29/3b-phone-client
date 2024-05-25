import { List, ListItem, ListItemText } from "@mui/material"

const CardCondition = ({ descriptions, secondary }: any): any => {
    return (
        <List>
            {
                descriptions.map((description: any, index: number) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={description}
                            secondary={secondary ? 'Secondary text' : null}
                        />
                    </ListItem>
                ))
            }
        </List>
    )
}

export default CardCondition