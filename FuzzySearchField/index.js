import React, { useContext, useState } from 'react'
import Input from 'reactstrap/es/Input'
import { useField } from 'amiable-forms'

import FieldDecorations from '../Fields/FieldDecorations'
import useOffClick from './useOffClick'
import fuzzySearchFunctions from '../../utils/fuzzySearchFunctions'
import KeyNavigator, { context } from './KeyNavigator'
import sortByLabel from '../../utils/sortByLabel'
import './index.scss'

const { fuzzySearchOptions } = fuzzySearchFunctions

const toSuggestionArr = (arr, suggestion) => ([
  ...arr,
  {
    label: suggestion.label,
    value: suggestion.value
  }
])

const alphaSort = (a, b) => a.label.localeCompare(b.label)

const getSuggestions = (options, searchTerm) => {
  if (!options || !searchTerm) {
    return []
  }

  if (Array.isArray(options)) {
    return fuzzySearchOptions(options.sort().map(value => ({ value, label: value })).sort(alphaSort), searchTerm, 50).reduce(toSuggestionArr, [])
  }
  return fuzzySearchOptions(sortByLabel(options), searchTerm, 50)
}

const SuggestionListItem = ({ suggestion, i, onSelect }) => {
  const selected = useContext(context)
  const className = selected === i ? 'suggestion-active' : ''

  const onClick = () => onSelect(suggestion.value)
  return (
    <li className={className} onClick={onClick}>
      {suggestion.label}
    </li>
  )
}

const SuggestionsList = ({ suggestions, onSelect }) =>
  <div className='suggestions-dropdown'>
    <ul>
      {suggestions.map((s, i) => <SuggestionListItem key={s.value + i} suggestion={s} i={i} onSelect={onSelect} />)}
    </ul>
  </div>

const FuzzySearch = ({ name, label, validators, parse, format, parseWhenFocused, placeholder, disabled, onKeyDown, onKeyUp, tooltip, options }) => {
  const { value, onChange, onBlur, error, visited, submitted, valid, onFocus, setValue } = useField({ name, validators, parse, format, parseWhenFocused })
  const suggestions = getSuggestions(options, value)

  const [show, setShow] = useState(false)
  const [usingSelectedValue, setUsingSelectedValue] = useState(false)

  const showSuggestions = () => setShow(true)
  const hideSuggestions = () => setShow(false)

  const { elementRef } = useOffClick(hideSuggestions, showSuggestions)
  const _onChange = e => onChange(e) || showSuggestions() || setUsingSelectedValue(false)
  const onSelect = selectedValue => setValue(selectedValue) || hideSuggestions() || setUsingSelectedValue(true)
  const navSelect = i => setValue(suggestions[i].value) || hideSuggestions() || setUsingSelectedValue(true)

  const _valid = valid && usingSelectedValue
  const invalid = !_valid && ((visited && !show) || submitted)

  return (
    <div ref={elementRef}>
      <KeyNavigator getTotal={() => suggestions?.length} onSelect={navSelect}>
        <FieldDecorations label={label} error={error} visited={visited} submitted={submitted} validators={validators} tooltip={tooltip}>
          <Input autoComplete='off' name={name} invalid={invalid} onChange={_onChange} onKeyUp={onKeyUp} onKeyDown={onKeyDown} value={value} onBlur={onBlur} onFocus={onFocus} placeholder={placeholder} disabled={disabled} />
        </FieldDecorations>
        {!!suggestions.length && show && <SuggestionsList suggestions={suggestions} onSelect={onSelect} />}
      </KeyNavigator>
    </div>
  )
}

export default FuzzySearch
