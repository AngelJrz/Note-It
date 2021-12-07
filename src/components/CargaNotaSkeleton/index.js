import React from 'react';
import NotaSkeleton from "../../components/NotaSkeleton";

export default function CargaNotaSkeleton() {
    return (
      <div className="row center">
        <NotaSkeleton />
        <NotaSkeleton />
        <NotaSkeleton />
      </div>
    );
}
