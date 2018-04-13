import React from 'react';

import { configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

describe('NavigationItems',() => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })

    it('should render 2 NavigationItem components',() => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    it('should have only 1 NavigationItem components',() => {
        wrapper = shallow(<NavigationItems/>);
        expect(wrapper.contains(<NavigationItems active/>)).toHaveLength(1);
    })
})