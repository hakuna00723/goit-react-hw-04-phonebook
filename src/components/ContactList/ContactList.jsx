import { ListItem } from 'components/ContactListItem/ContactListItem';
import PropTypes from 'prop-types';
import { List } from './ContactList.styled';

export const ContactList = ({ filtered, onDelete }) => {
  return (
    <List>
      {filtered.map(({ id, name, number }) => {
        return (
          <ListItem
            key={id}
            name={name}
            number={number}
            onDelete={onDelete}
            delContact={id}
          />
        );
      })}
    </List>
  );
};

ContactList.propTypes = {
  filter: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};
