import React, { Component } from 'react';
import Link from 'next/link';

export default () => (
  <ul>
    <li><Link href="/"><a>home</a></Link></li>
    <li><Link href="/about"><a>about</a></Link></li>
  </ul>
)
