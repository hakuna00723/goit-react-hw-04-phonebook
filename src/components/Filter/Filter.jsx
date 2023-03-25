import PropTypes from 'prop-types';
import { Label, Input } from './Filter.styled';

export const Filter = ({ onFilter }) => {
  return (
    <Label>
      Find contacts by Name
      <br/>
      <Input type="text" name="filter" onChange={e => onFilter(e)}></Input>
    </Label>
  );
};

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired
};
